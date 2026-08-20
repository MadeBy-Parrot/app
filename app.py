from flask import Flask
from flask_login import LoginManager
from config import Config
from models import db, User, Site
import os
from sqlalchemy import inspect, text

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# -------- অটোমেটিক ডাটাবেস মাইগ্রেশন --------
def migrate_database():
    inspector = inspect(db.engine)
    
    # Migrate User table
    if inspector.has_table('user'):
        columns = [col['name'] for col in inspector.get_columns('user')]
        user_required = ['is_verified', 'google_id', 'verification_token', 'created_at']
        with db.engine.connect() as conn:
            for col_name in user_required:
                if col_name not in columns:
                    conn.execute(text(f"ALTER TABLE user ADD COLUMN {col_name} VARCHAR(128);"))
                    print(f"✅ Added missing column '{col_name}' to user table.")
            conn.commit()
    
    # Migrate Site table
    if inspector.has_table('site'):
        columns = [col['name'] for col in inspector.get_columns('site')]
        site_required = ['created_at', 'updated_at']
        with db.engine.connect() as conn:
            for col_name in site_required:
                if col_name not in columns:
                    conn.execute(text(f"ALTER TABLE site ADD COLUMN {col_name} VARCHAR(128);"))
                    print(f"✅ Added missing column '{col_name}' to site table.")
            conn.commit()

# -------- মাইগ্রেশন রান করা --------
with app.app_context():
    db.create_all()
    migrate_database()

# -------- রুট ইম্পোর্ট ---------
from routes import init_routes
init_routes(app, db)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
