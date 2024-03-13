from flask import Flask, jsonify, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)  # This is fine for development, but for production we need to restrict to our frontend domain for security
# CORS(app, resources={r"/api/*": {"origins": "http://OurFrontendDomain.com"}})

with open('resources.json', 'r') as file:
    resources = json.load(file)

@app.route('/api/resources', methods=['GET'])
def get_resources():
    return jsonify(resources)

@app.route('/api/resources', methods=['POST'])
def add_resource():
    new_resource = request.json
    resources.append(new_resource)
    save_resources()
    return jsonify(new_resource), 201

@app.route('/api/resources/<int:resource_id>', methods=['PUT'])
def update_resource(resource_id):
    resource = next((r for r in resources if r["id"] == resource_id), None)
    if not resource:
        return jsonify({"message": "Resource not found"}), 404
    update_data = request.json
    resource.update(update_data)
    save_resources()
    return jsonify(resource)

@app.route('/api/resources/<int:resource_id>', methods=['DELETE'])
def delete_resource(resource_id):
    global resources
    resources = [r for r in resources if r["id"] != resource_id]
    save_resources()
    return jsonify({"message": "Resource deleted"})

def save_resources():
    with open('resources.json', 'w') as file:
        json.dump(resources, file, indent=2)

if __name__ == '__main__':
    app.run(debug=True)