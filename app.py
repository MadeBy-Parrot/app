from flask import Flask
from flask_login import LoginManager
from config import Config
from models import db, User
import os
from sqlalchemy import inspect

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# -------- অটোমেটিক ডাটাবেস মাইগ্রেশন ফাংশন --------
def migrate_database():
    """Check if required columns exist and add them if missing."""
    inspector = inspect(db.engine)
    # Get existing columns of 'user' table
    columns = [col['name'] for col in inspector.get_columns('user')]
    # List of columns we need to add
    required = ['is_verified', 'google_id', 'verification_token']
    for col_name in required:
        if col_name not in columns:
            # Add missing column without default (SQLite supports this)
            db.engine.execute(f"ALTER TABLE user ADD COLUMN {col_name} VARCHAR(128);")
            print(f"✅ Added missing column '{col_name}' to user table.")

# -------- রুট ইম্পোর্ট ---------
from routes import init_routes
init_routes(app, db)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # creates tables if not exist
        migrate_database()  # adds missing columns
    app.run(debug=True, host='0.0.0.0', port=5000)
