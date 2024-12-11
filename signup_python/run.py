import os
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# In-memory user database (as a dictionary)
users = {}

@app.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()
    username = data.get('username')

    if username in users:
        return jsonify({"status": "Conflict: Username already exists"}), 409
    else:
        # Add user to the database (in this case, the users dictionary)
        users[username] = {"role": "user"}  # Default role can be set or updated based on your logic
        return jsonify({"status": "User registered successfully"}), 201

@app.route('/verify', methods=['POST'])
def verify_user():
    data = request.get_json()
    username = data.get('username')

    if username in users:
        return jsonify({"status": "User exists", "username": username}), 200
    else:
        return jsonify({"status": "User not found"}), 404

if __name__ == "__main__":
    app.run(debug=True)
