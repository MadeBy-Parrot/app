from flask import Flask, jsonify
from flask_login import LoginManager
from config import Config
from models import db, User, Site, Category, Element, ColorPalette, SiteFont
import os, json
from sqlalchemy import inspect, text

app = Flask(__name__)
app.config.from_object(Config)

# Health check route - placed directly on app for guaranteed availability
@app.route('/health')
def health_check():
    return "OK", 200

# Root route - redirect to login
@app.route('/')
def root():
    from flask import redirect, url_for
    return redirect(url_for('login'))

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
app = init_routes(app, db)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
