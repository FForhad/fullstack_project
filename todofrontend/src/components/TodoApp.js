import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = '/api/todos/';

function TodoApp() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await axios.get(API_URL);
            setTodos(response.data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    const addTodo = async () => {
        try {
            const response = await axios.post(API_URL, { title: newTodo, completed: false });
            setTodos([...todos, response.data]);
            setNewTodo('');
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    const toggleTodo = async (id, completed) => {
        try {
            await axios.patch(`${API_URL}${id}/`, { completed: !completed });
            fetchTodos();
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    return (
        <div>
            <h1>Todo List</h1>
            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new todo"
            />
            <button onClick={addTodo}>Add</button>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <span
                            style={{
                                textDecoration: todo.completed ? 'line-through' : 'none',
                            }}
                            onClick={() => toggleTodo(todo.id, todo.completed)}
                        >
                            {todo.title}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoApp;
