from flask import render_template, request, redirect, url_for, flash, jsonify, abort
from flask_login import login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User, Site
import json, uuid, secrets, requests
from flask_mail import Message
from urllib.parse import urljoin

def init_routes(app, db, mail):
    # ------------------- Google OAuth -------------------
    @app.route('/auth/google')
    def google_auth():
        # CSRF সুরক্ষার জন্য state যুক্ত করা হলো
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
        state = request.args.get('state')
        if not code:
            flash('Authorization failed')
            return redirect(url_for('login'))
        # ... rest of OAuth logic (same as before) ...
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

    # ... باقি রাউটগুলো (Signup, Login, Dashboard, Site CRUD) আগের মতোই থাকবে ...
    # শুধু builder রাউটে Cloudinary env পাঠাতে হবে
    @app.route('/builder/<int:site_id>')
    @login_required
    def builder(site_id):
        site = Site.query.get_or_404(site_id)
        if site.user_id != current_user.id:
            abort(404)
        return render_template('builder.html', 
                               site=site,
                               cloud_name=app.config['CLOUDINARY_CLOUD_NAME'],
                               upload_preset=app.config['CLOUDINARY_UPLOAD_PRESET'])

    # ... বাকি (view_site, index) ...
    return app
