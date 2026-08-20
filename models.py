from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from datetime import datetime

db = SQLAlchemy()

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=True)
    is_verified = db.Column(db.Boolean, default=True)
    google_id = db.Column(db.String(100), unique=True, nullable=True)
    verification_token = db.Column(db.String(128), unique=True, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    is_admin = db.Column(db.Boolean, default=False)  # অ্যাডমিন রোল
    sites = db.relationship('Site', backref='owner', lazy=True, cascade='all, delete-orphan')

    def set_password(self, password):
        from werkzeug.security import generate_password_hash
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        from werkzeug.security import check_password_hash
        return check_password_hash(self.password_hash, password)

class Site(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(100), default="My Site")
    slug = db.Column(db.String(120), unique=True, nullable=True)
    data = db.Column(db.Text, nullable=True, default='{"elements": []}')
    published = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def generate_slug(self):
        import uuid
        self.slug = f"site-{uuid.uuid4().hex[:8]}"

# ============= NEW ADMIN MODELS =============
class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    icon = db.Column(db.String(50), default='category')
    elements = db.relationship('Element', backref='category_rel', lazy=True, cascade='all, delete-orphan')

class Element(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    label = db.Column(db.String(100), nullable=False)
    type = db.Column(db.String(50), nullable=False)       # button, text, image, font, color
    html = db.Column(db.Text, nullable=False)
    default_styles = db.Column(db.Text, nullable=False)   # JSON string
    preview_html = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class ColorPalette(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    color_hex = db.Column(db.String(20), nullable=False)
    category = db.Column(db.String(20), default='primary') # primary, accent, gradient

class SiteFont(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    font_name = db.Column(db.String(100), nullable=False, unique=True)
    font_url = db.Column(db.String(500), nullable=True)
    sample_text = db.Column(db.String(100), default='AaBbCc')
