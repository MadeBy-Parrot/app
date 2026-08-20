from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from datetime import datetime

# db কে এখানে ডিক্লেয়ার করা হলো, app এর সাথে এখনো যুক্ত হয়নি
db = SQLAlchemy()

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)
    sites = db.relationship('Site', backref='owner', lazy=True)

class Site(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(100), default="My Site")
    slug = db.Column(db.String(100), unique=True, nullable=True)
    data = db.Column(db.Text, default="{}")
    published = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
