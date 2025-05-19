# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)

# Configurar SQLite
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Modelo de la tarea
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(200), nullable=False)
    completed = db.Column(db.Boolean, default=False)

# Crear la base de datos
with app.app_context():
    db.create_all()

# Rutas API

@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    return jsonify([
        {'id': task.id, 'text': task.text, 'completed': task.completed}
        for task in tasks
    ])

@app.route('/api/tasks', methods=['POST'])
def add_task():
    data = request.json
    if not data or 'text' not in data:
        return jsonify({'error': 'Missing task text'}), 400
    new_task = Task(text=data['text'])
    db.session.add(new_task)
    db.session.commit()
    return jsonify({'id': new_task.id, 'text': new_task.text, 'completed': new_task.completed}), 201

@app.route('/api/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    task = Task.query.get(task_id)
    if task:
        db.session.delete(task)
        db.session.commit()
        return '', 204
    return jsonify({'error': 'Task not found'}), 404

@app.route('/api/tasks/<int:task_id>', methods=['PATCH'])
def toggle_task(task_id):
    task = Task.query.get(task_id)
    if task:
        task.completed = not task.completed
        db.session.commit()
        return jsonify({'id': task.id, 'text': task.text, 'completed': task.completed})
    return jsonify({'error': 'Task not found'}), 404

@app.route('/health')
def health():
    return '', 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)  # Quita debug=True para producción
