from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from datetime import datetime

db = SQLAlchemy()

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=True)
    is_verified = db.Column(db.Boolean, default=False)
    google_id = db.Column(db.String(100), unique=True, nullable=True)
    verification_token = db.Column(db.String(128), unique=True, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    sites = db.relationship('Site', backref='owner', lazy=True, cascade='all, delete-orphan')

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
