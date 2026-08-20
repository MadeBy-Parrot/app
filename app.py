from flask import Flask
from flask_login import LoginManager
from config import Config
from models import db, User
import os

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

from routes import init_routes
init_routes(app, db)

if __name__ == '__main__':
    with app.app_context():
        # 🔥 ডাটাবেস রিসেট সুইচ (শুধু Render-এ ডেপ্লয়ের সময় ব্যবহার করবেন)
        if os.environ.get('RESET_DB', 'false').lower() == 'true':
            print("⚠️ WARNING: Dropping and recreating all database tables...")
            db.drop_all()
            db.create_all()
            print("✅ Database reset complete!")
        else:
            db.create_all()
    app.run(debug=True, host='0.0.0.0', port=5000)
