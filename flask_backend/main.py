from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This is fine for development, but for production we need to restrict to our frontend domain for security
# CORS(app, resources={r"/api/*": {"origins": "http://OurFrontendDomain.com"}})

# Currently populated with sample data
resources = [
    {"id": 1, "name": "Food Bank A", "type": "Food Bank", "location": "123 Main St"},
    {"id": 2, "name": "Community Church B", "type": "Church", "location": "456 Elm St"},
]

@app.route('/api/resources', methods=['GET'])
def get_resources():
    return jsonify(resources)

@app.route('/api/resources', methods=['POST'])
def add_resource():
    new_resource = request.json
    resources.append(new_resource)
    return jsonify(new_resource), 201

@app.route('/api/resources/<int:resource_id>', methods=['PUT'])
def update_resource(resource_id):
    resource = next((r for r in resources if r["id"] == resource_id), None)
    if not resource:
        return jsonify({"message": "Resource not found"}), 404
    update_data = request.json
    resource.update(update_data)
    return jsonify(resource)

@app.route('/api/resources/<int:resource_id>', methods=['DELETE'])
def delete_resource(resource_id):
    global resources
    resources = [r for r in resources if r["id"] != resource_id]
    return jsonify({"message": "Resource deleted"})

if __name__ == '__main__':
    app.run(debug=True)
