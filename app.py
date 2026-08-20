from flask import Flask
from flask_login import LoginManager
from config import Config
from models import db, User
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

def migrate_database():
    inspector = inspect(db.engine)
    if not inspector.has_table('user'):
        return
    columns = [col['name'] for col in inspector.get_columns('user')]
    required = ['is_verified', 'google_id', 'verification_token']
    with db.engine.connect() as conn:
        for col_name in required:
            if col_name not in columns:
                conn.execute(text(f"ALTER TABLE user ADD COLUMN {col_name} VARCHAR(128);"))
                print(f"✅ Added missing column '{col_name}' to user table.")
        conn.commit()

from routes import init_routes
init_routes(app, db)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        migrate_database()
    app.run(debug=True, host='0.0.0.0', port=5000)
