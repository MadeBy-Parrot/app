from flask import Flask
from flask_login import LoginManager
from config import Config
from models import db, User, Site, Category, Element, ColorPalette, SiteFont
import os, json
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

def seed_database():
    if Category.query.count() == 0:
        default_cats = ['Layout', 'Buttons', 'Cards', 'Text', 'Inputs', 'Search Bars', 'Images', 'Shapes', 'Icons']
        for cat_name in default_cats:
            cat = Category(name=cat_name)
            db.session.add(cat)
        
        # Add a sample button
        button_cat = Category.query.filter_by(name='Buttons').first()
        if button_cat:
            btn = Element(
                category_id=button_cat.id,
                label='Primary',
                type='button',
                html='<button style="background:#232846; color:#fff; border:none; padding:12px 24px; border-radius:12px;">Get Started</button>',
                default_styles=json.dumps({"width":"160px","height":"48px"})
            )
            db.session.add(btn)
        db.session.commit()
        print("✅ Database seeded with default categories.")

# ---- Migration & DB init ----
reset_db = os.environ.get('RESET_DB', 'false').lower() == 'true'
with app.app_context():
    if reset_db:
        print("⚠️ Dropping and recreating DB...")
        db.drop_all()
        db.create_all()
        seed_database()
    else:
        db.create_all()
        seed_database()

from routes import init_routes
# ✅ ফিক্স করা অংশ: init_routes থেকে রিটার্ন করা অ্যাপটি আবার `app`-এ অ্যাসাইন করা
app = init_routes(app, db)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
