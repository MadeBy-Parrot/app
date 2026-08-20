from flask import render_template, request, redirect, url_for, flash, jsonify, abort
from flask_login import login_user, logout_user, login_required, current_user
from models import db, User, Site
import json
import requests

def init_routes(app, db):
    
    # -------- JSON Error Handlers --------
    @app.errorhandler(404)
    def not_found_error(e):
        return jsonify({"error": "Resource not found"}), 404

    @app.errorhandler(500)
    def internal_error(e):
        return jsonify({"error": "Internal server error occurred. Check Flask logs."}), 500

    # ------------------- Firebase Auth (REST API) -------------------
    @app.route('/auth/firebase', methods=['POST'])
    def auth_firebase():
        try:
            id_token = request.json.get('idToken')
            if not id_token:
                return jsonify({"error": "No token provided"}), 400

            api_key = app.config.get('FIREBASE_WEB_API_KEY', 'AIzaSyD538lgMjUEUXSbNFQuVgNphe0OVackYuk')
            url = f"https://identitytoolkit.googleapis.com/v1/accounts:lookup?key={api_key}"
            
            resp = requests.post(url, json={"idToken": id_token})
            data = resp.json()
            
            if resp.status_code != 200:
                error_msg = data.get('error', {}).get('message', 'Invalid Firebase token')
                return jsonify({"error": error_msg}), 401
            
            if 'users' not in data or not data['users']:
                return jsonify({"error": "User not found on Firebase"}), 401
            
            user_info = data['users'][0]
            email = user_info.get('email')
            name = user_info.get('displayName', 'User')
            uid = user_info.get('localId')
        except requests.exceptions.RequestException as e:
            print(f"🔥 Firebase network error: {e}")
            return jsonify({"error": "Unable to reach Firebase. Check API Key or Network."}), 503
        except Exception as e:
            print(f"🔥 Firebase token verification failed: {e}")
            return jsonify({"error": f"Server error: {str(e)}"}), 401

        try:
            user = User.query.filter_by(email=email).first()
            if not user:
                user = User(
                    email=email,
                    username=name,
                    is_verified=True,
                    password_hash="google-oauth",
                    google_id=uid,
                    verification_token=None
                )
                db.session.add(user)
                db.session.commit()

            login_user(user)
            return jsonify({"success": True})
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": f"Database error: {str(e)}"}), 500

    # ------------------- Login Page -------------------
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
                               cloud_name=app.config.get('CLOUDINARY_CLOUD_NAME', 'g99ay6kz'),
                               upload_preset=app.config.get('CLOUDINARY_UPLOAD_PRESET', 'madeby_parrot_preset'))

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

    # ---------- Slug check endpoint ----------
    @app.route('/site/check-slug', methods=['GET'])
    @login_required
    def check_slug():
        slug = request.args.get('slug', '').strip().lower()
        if not slug:
            return jsonify({"available": False, "message": "Slug cannot be empty"})
        
        # Validate format: only lowercase letters, numbers, and hyphens
        import re
        if not re.match(r'^[a-z0-9]+(-[a-z0-9]+)*$', slug):
            return jsonify({"available": False, "message": "Only lowercase letters, numbers, and hyphens allowed."})
        
        # Check if slug already used by any site
        existing = Site.query.filter_by(slug=slug).first()
        if existing:
            return jsonify({"available": False, "message": "This site name is already taken."})
        
        return jsonify({"available": True, "message": "Available!"})

    # ---------- Publish with custom slug ----------
    @app.route('/site/<int:site_id>/publish', methods=['POST'])
    @login_required
    def publish_site(site_id):
        site = Site.query.get_or_404(site_id)
        if site.user_id != current_user.id:
            abort(404)
        
        data = request.get_json()
        slug = data.get('slug', '').strip().lower() if data else ''
        
        # If slug provided, validate it; else generate random
        if slug:
            import re
            if not re.match(r'^[a-z0-9]+(-[a-z0-9]+)*$', slug):
                return jsonify({"error": "Invalid slug format"}), 400
            if Site.query.filter_by(slug=slug).first():
                return jsonify({"error": "Slug already taken"}), 400
            site.slug = slug
        else:
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
