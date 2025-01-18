import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/todos/'; // Update the URL if necessary

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data);
    } catch (err) {
      setError('Error fetching todos. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async () => {
    if (!newTodo.trim()) {
      setError('Todo cannot be empty.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(API_URL, { title: newTodo, completed: false });
      setTodos([...todos, response.data]);
      setNewTodo('');
    } catch (err) {
      setError('Error adding todo. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleTodo = async (id, completed) => {
    setLoading(true);
    setError(null);
    try {
      await axios.patch(`${API_URL}${id}/`, { completed: !completed });
      fetchTodos();
    } catch (err) {
      setError('Error updating todo. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo List</h1>

        {/* Display error message */}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* Input for adding todos */}
        <div>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo"
          />
          <button onClick={addTodo} disabled={loading}>
            {loading ? 'Adding...' : 'Add'}
          </button>
        </div>

        {/* Show loading state */}
        {loading && <p>Loading...</p>}

        {/* Display todos or empty state */}
        <ul>
          {!loading && todos.length === 0 && <p>No todos available. Add some!</p>}
          {todos.map((todo) => (
            <li key={todo.id}>
              <span
                style={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  cursor: 'pointer',
                }}
                onClick={() => toggleTodo(todo.id, todo.completed)}
              >
                {todo.title}
              </span>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
