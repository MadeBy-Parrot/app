from flask import render_template, request, redirect, url_for, flash, jsonify, abort
from flask_login import login_user, logout_user, login_required, current_user
from models import db, User, Site
import json, secrets, requests

def init_routes(app, db):
    # ------------------- Google OAuth -------------------
    @app.route('/auth/google')
    def google_auth():
        state = secrets.token_urlsafe(16)
        params = {
            'client_id': app.config['GOOGLE_CLIENT_ID'],
            'redirect_uri': app.config['GOOGLE_REDIRECT_URI'],
            'response_type': 'code',
            'scope': 'openid email profile',
            'state': state
        }
        url = 'https://accounts.google.com/o/oauth2/v2/auth?' + '&'.join(f'{k}={v}' for k,v in params.items())
        return redirect(url)

    @app.route('/auth/google/callback')
    def google_callback():
        code = request.args.get('code')
        if not code:
            flash('Authorization failed')
            return redirect(url_for('login'))
        
        token_url = 'https://oauth2.googleapis.com/token'
        data = {
            'code': code,
            'client_id': app.config['GOOGLE_CLIENT_ID'],
            'client_secret': app.config['GOOGLE_CLIENT_SECRET'],
            'redirect_uri': app.config['GOOGLE_REDIRECT_URI'],
            'grant_type': 'authorization_code',
        }
        resp = requests.post(token_url, data=data)
        if resp.status_code != 200:
            flash('Failed to get access token')
            return redirect(url_for('login'))
        token_data = resp.json()
        access_token = token_data.get('access_token')
        
        user_info_url = 'https://www.googleapis.com/oauth2/v2/userinfo'
        headers = {'Authorization': f'Bearer {access_token}'}
        user_resp = requests.get(user_info_url, headers=headers)
        if user_resp.status_code != 200:
            flash('Failed to fetch user info')
            return redirect(url_for('login'))
        user_info = user_resp.json()
        email = user_info.get('email')
        google_id = user_info.get('id')
        name = user_info.get('name', 'User')
        if not email or not google_id:
            flash('Invalid user info from Google')
            return redirect(url_for('login'))

        user = User.query.filter_by(email=email).first()
        if user:
            if not user.google_id:
                user.google_id = google_id
                db.session.commit()
            login_user(user)
            return redirect(url_for('dashboard'))
        else:
            new_user = User(
                email=email,
                username=name,
                google_id=google_id,
                is_verified=True,
                password_hash=None,
                verification_token=None,
            )
            db.session.add(new_user)
            db.session.commit()
            login_user(new_user)
            return redirect(url_for('dashboard'))

    # ------------------- Login -------------------
    @app.route('/login')
    def login():
        if current_user.is_authenticated:
            return redirect(url_for('dashboard'))
        return render_template('login.html')

    @app.route('/logout')
    @login_required
    def logout():
        logout_user()
        return redirect(url_for('login'))

    # ------------------- Dashboard -------------------
    @app.route('/dashboard')
    @login_required
    def dashboard():
        sites = Site.query.filter_by(user_id=current_user.id).order_by(Site.updated_at.desc()).all()
        return render_template('dashboard.html', sites=sites)

    # ------------------- Site CRUD -------------------
    @app.route('/site/create', methods=['POST'])
    @login_required
    def create_site():
        site = Site(user_id=current_user.id, data=json.dumps({"elements": []}))
        db.session.add(site)
        db.session.commit()
        return redirect(url_for('builder', site_id=site.id))

    @app.route('/builder/<int:site_id>')
    @login_required
    def builder(site_id):
        site = Site.query.get_or_404(site_id)
        if site.user_id != current_user.id:
            abort(404)
        return render_template('builder.html', 
                               site=site,
                               cloud_name=app.config.get('CLOUDINARY_CLOUD_NAME', ''),
                               upload_preset=app.config.get('CLOUDINARY_UPLOAD_PRESET', ''))

    @app.route('/site/<int:site_id>/save', methods=['POST'])
    @login_required
    def save_site(site_id):
        site = Site.query.get_or_404(site_id)
        if site.user_id != current_user.id:
            abort(404)
        data = request.get_json()
        site.data = json.dumps(data)
        db.session.commit()
        return jsonify({"success": True})

    @app.route('/site/<int:site_id>/publish', methods=['POST'])
    @login_required
    def publish_site(site_id):
        site = Site.query.get_or_404(site_id)
        if site.user_id != current_user.id:
            abort(404)
        if not site.slug:
            site.generate_slug()
            while Site.query.filter_by(slug=site.slug).first():
                site.generate_slug()
        site.published = True
        db.session.commit()
        return jsonify({
            "success": True,
            "slug": site.slug,
            "url": url_for('view_site', slug=site.slug, _external=True)
        })

    @app.route('/site/<int:site_id>/unpublish', methods=['POST'])
    @login_required
    def unpublish_site(site_id):
        site = Site.query.get_or_404(site_id)
        if site.user_id != current_user.id:
            abort(404)
        site.published = False
        db.session.commit()
        return jsonify({"success": True})

    @app.route('/site/<int:site_id>/delete', methods=['POST'])
    @login_required
    def delete_site(site_id):
        site = Site.query.get_or_404(site_id)
        if site.user_id != current_user.id:
            abort(404)
        db.session.delete(site)
        db.session.commit()
        return redirect(url_for('dashboard'))

    # ------------------- Live Site -------------------
    @app.route('/s/<slug>')
    def view_site(slug):
        site = Site.query.filter_by(slug=slug, published=True).first_or_404()
        try:
            data = json.loads(site.data)
        except:
            data = {"elements": []}
        return render_template('site_view.html', site=site, data=data)

    # ------------------- Root -------------------
    @app.route('/')
    def index():
        if current_user.is_authenticated:
            return redirect(url_for('dashboard'))
        return redirect(url_for('login'))

    return app
