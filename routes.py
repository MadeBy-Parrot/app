from flask import render_template, request, redirect, url_for, flash, jsonify, abort
from flask_login import login_user, logout_user, login_required, current_user
from models import db, User, Site, Category, Element, ColorPalette, SiteFont
import json
import requests

# -- Helper to check if user is admin --
def admin_required(f):
    from functools import wraps
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not current_user.is_authenticated or not current_user.is_admin:
            abort(403)
        return f(*args, **kwargs)
    return decorated_function

def init_routes(app, db):
    
    # -------- JSON Error Handlers --------
    @app.errorhandler(404)
    def not_found_error(e):
        return jsonify({"error": "Resource not found"}), 404

    @app.errorhandler(500)
    def internal_error(e):
        return jsonify({"error": "Internal server error occurred."}), 500

    # ------------------- Firebase Auth (REST API) -------------------
    @app.route('/auth/firebase', methods=['POST'])
    def auth_firebase():
        try:
            id_token = request.json.get('idToken')
            if not id_token: return jsonify({"error": "No token provided"}), 400

            api_key = app.config.get('FIREBASE_WEB_API_KEY', 'AIzaSyD538lgMjUEUXSbNFQuVgNphe0OVackYuk')
            url = f"https://identitytoolkit.googleapis.com/v1/accounts:lookup?key={api_key}"
            
            resp = requests.post(url, json={"idToken": id_token})
            data = resp.json()
            
            if resp.status_code != 200:
                return jsonify({"error": data.get('error', {}).get('message', 'Invalid token')}), 401
            
            user_info = data['users'][0]
            email = user_info.get('email')
            name = user_info.get('displayName', 'User')
            uid = user_info.get('localId')
        except Exception as e:
            return jsonify({"error": f"Server error: {str(e)}"}), 401

        # Create user if not exists
        user = User.query.filter_by(email=email).first()
        if not user:
            user = User(
                email=email, username=name, is_verified=True,
                password_hash="google-oauth", google_id=uid, is_admin=False
            )
            db.session.add(user)
            db.session.commit()
        login_user(user)
        return jsonify({"success": True})

    # ------------------- Login / Logout -------------------
    @app.route('/login')
    def login():
        if current_user.is_authenticated: return redirect(url_for('dashboard'))
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
        if site.user_id != current_user.id: abort(404)
        return render_template('builder.html', site=site)

    @app.route('/site/<int:site_id>/save', methods=['POST'])
    @login_required
    def save_site(site_id):
        site = Site.query.get_or_404(site_id)
        if site.user_id != current_user.id: abort(404)
        data = request.get_json()
        site.data = json.dumps(data)
        db.session.commit()
        return jsonify({"success": True})

    @app.route('/site/<int:site_id>/publish', methods=['POST'])
    @login_required
    def publish_site(site_id):
        site = Site.query.get_or_404(site_id)
        if site.user_id != current_user.id: abort(404)
        data = request.get_json() or {}
        slug = data.get('slug', '').strip().lower()
        
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
        return jsonify({"success": True, "slug": site.slug, "url": url_for('view_site', slug=site.slug, _external=True)})

    @app.route('/site/<int:site_id>/delete', methods=['POST'])
    @login_required
    def delete_site(site_id):
        site = Site.query.get_or_404(site_id)
        if site.user_id != current_user.id: abort(404)
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

    # ------------------- ADMIN PANEL (DAY 2) -------------------
    @app.route('/admin')
    @login_required
    @admin_required
    def admin_panel():
        categories = Category.query.all()
        elements = Element.query.all()
        colors = ColorPalette.query.all()
        fonts = SiteFont.query.all()
        return render_template('admin.html', categories=categories, elements=elements, colors=colors, fonts=fonts)

    # --- Admin API: Elements ---
    @app.route('/api/elements', methods=['GET'])
    def api_get_elements():
        elements = Element.query.all()
        return jsonify([{
            'id': e.id, 'label': e.label, 'type': e.type,
            'html': e.html, 'default_styles': json.loads(e.default_styles),
            'category': e.category_rel.name if e.category_rel else 'Uncategorized'
        } for e in elements])

    @app.route('/api/elements', methods=['POST'])
    @login_required
    @admin_required
    def api_create_element():
        data = request.get_json()
        cat = Category.query.filter_by(name=data['category']).first()
        if not cat:
            cat = Category(name=data['category'])
            db.session.add(cat)
            db.session.commit()
        
        el = Element(
            category_id=cat.id, label=data['label'], type=data['type'],
            html=data['html'], default_styles=json.dumps(data['default_styles'])
        )
        db.session.add(el)
        db.session.commit()
        return jsonify({'success': True, 'id': el.id})

    @app.route('/api/elements/<int:elem_id>', methods=['DELETE'])
    @login_required
    @admin_required
    def api_delete_element(elem_id):
        el = Element.query.get_or_404(elem_id)
        db.session.delete(el)
        db.session.commit()
        return jsonify({'success': True})

    # --- Admin API: Colors ---
    @app.route('/api/colors', methods=['GET', 'POST'])
    @login_required
    @admin_required
    def api_colors():
        if request.method == 'GET':
            return jsonify([{'id': c.id, 'name': c.name, 'hex': c.color_hex} for c in ColorPalette.query.all()])
        data = request.get_json()
        c = ColorPalette(name=data['name'], color_hex=data['hex'])
        db.session.add(c)
        db.session.commit()
        return jsonify({'success': True})

    # --- Admin API: Fonts ---
    @app.route('/api/fonts', methods=['GET', 'POST'])
    @login_required
    @admin_required
    def api_fonts():
        if request.method == 'GET':
            return jsonify([{'id': f.id, 'name': f.font_name} for f in SiteFont.query.all()])
        data = request.get_json()
        f = SiteFont(font_name=data['name'])
        db.session.add(f)
        db.session.commit()
        return jsonify({'success': True})

    # ------------------- PUBLIC API (For Builder) -------------------
    @app.route('/api/public/elements', methods=['GET'])
    def public_elements():
        elements = Element.query.all()
        result = {}
        for el in elements:
            cat_name = el.category_rel.name if el.category_rel else 'Uncategorized'
            if cat_name not in result: result[cat_name] = []
            result[cat_name].append({
                'type': el.type, 'label': el.label,
                'html': el.html, 'defaultStyles': json.loads(el.default_styles)
            })
        return jsonify(result)

    @app.route('/api/public/colors', methods=['GET'])
    def public_colors():
        return jsonify([{'name': c.name, 'hex': c.color_hex} for c in ColorPalette.query.all()])

    @app.route('/api/public/fonts', methods=['GET'])
    def public_fonts():
        return jsonify([{'name': f.font_name} for f in SiteFont.query.all()])

    # ------------------- Root -------------------
    @app.route('/')
    def index():
        if current_user.is_authenticated: return redirect(url_for('dashboard'))
        return redirect(url_for('login'))

    return app
