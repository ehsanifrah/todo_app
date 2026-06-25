import os
import pymysql
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Broaden CORS to cleanly support tracking across the Application Load Balancer
CORS(app, support_credentials=True)

def get_db_connection():
    return pymysql.connect(
        host=os.environ.get('DB_HOST', 'db'),
        user=os.environ.get('DB_USER', 'root'),
        password=os.environ.get('DB_PASSWORD', 'secret_password'),
        database=os.environ.get('DB_NAME', 'todos_db'),
        port=3306,
        cursorclass=pymysql.cursors.DictCursor
    )

# strict_slashes=False ensures /api/todos and /api/todos/ both route flawlessly
@app.route('/api/todos', methods=['GET'], strict_slashes=False)
def get_todos():
    try:
        conn = get_db_connection()
        with conn.cursor() as cur:
            cur.execute('SELECT * FROM todos ORDER BY id DESC;')
            todos = cur.fetchall()
        conn.close()
        return jsonify(todos), 200
    except Exception as e:
        print(f"Error fetching todos: {e}")
        return jsonify({"error": "Database connection error"}), 500

@app.route('/api/todos', methods=['POST'], strict_slashes=False)
def add_todo():
    try:
        data = request.get_json() or {}
        task = data.get('task', '').strip()
        
        if not task:
            return jsonify({"error": "Task text cannot be empty"}), 400

        conn = get_db_connection()
        with conn.cursor() as cur:
            cur.execute('INSERT INTO todos (task) VALUES (%s);', (task,))
            conn.commit()
            last_id = cur.lastrowid
            
            cur.execute('SELECT * FROM todos WHERE id = %s;', (last_id,))
            new_todo = cur.fetchone()
            
        conn.close()
        return jsonify(new_todo), 201
    except Exception as e:
        print(f"Error adding todo: {e}")
        return jsonify({"error": "Database write error"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)