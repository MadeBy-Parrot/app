from flask import Flask, render_template, request, jsonify
import json
import os

app = Flask(__name__)

DATA_FILE = 'design_data.json'

# ফ্রন্টএন্ড পেজ রেন্ডার করা
@app.route('/')
def index():
    return render_template('index.html')

# ইউজার ডিজাইন সেভ করার API
@app.route('/save_design', methods=['POST'])
def save_design():
    data = request.json
    with open(DATA_FILE, 'w') as f:
        json.dump(data, f)
    return jsonify({'status': 'success', 'message': 'Design saved!'})

# ইউজার ডিজাইন লোড করার API
@app.route('/load_design', methods=['GET'])
def load_design():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r') as f:
            data = json.load(f)
        return jsonify(data)
    return jsonify({})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
