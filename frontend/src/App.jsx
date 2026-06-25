import React, { useState, useEffect } from 'react';

// Points to our Docker-mapped Flask container API route
const API_URL = "http://localhost:5000/api/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [error, setError] = useState("");

  // Fetch lists on component mount
  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to communicate with backend API");
        return res.json();
      })
      .then((data) => setTodos(data))
      .catch((err) => setError(err.message));
  }, []);

  // Post entry handle
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task })
      });

      if (!response.ok) throw new Error("Could not save item.");

      const newTodo = await response.json();
      setTodos([newTodo, ...todos]);
      setTask("");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: '450px', margin: '50px auto', padding: '20px', fontFamily: 'system-ui, sans-serif', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>AWS Simple To-Do App</h2>
      
      {error && <div style={{ color: 'red', backgroundColor: '#fee2e2', padding: '10px', borderRadius: '4px', marginBottom: '15px' }}>{error}</div>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="text" 
          value={task} 
          onChange={(e) => setTask(e.target.value)} 
          placeholder="What needs to be done?" 
          style={{ flexGrow: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Add</button>
      </form>

      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        {todos.length === 0 ? (
          <li style={{ textAlign: 'center', color: '#777', fontStyle: 'italic' }}>No tasks found. Add one!</li>
        ) : (
          todos.map(todo => (
            <li key={todo.id} style={{ padding: '12px', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center' }}>
              • {todo.task}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;