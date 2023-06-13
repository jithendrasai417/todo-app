import React, { useEffect, useState } from 'react';
import "./App.css"
function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editTodoId, setEditTodoId] = useState(null);
  const [editedTodoTitle, setEditedTodoTitle] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/1/todos')
      .then(response => response.json())
      .then(data => setTodos(data))
      .catch(error => console.log(error));
  }, []);

  const handleAddTodo = () => {
    if (newTodo.trim() === '') {
      return;
    }

    const todo = {
      id: Date.now(),
      title: newTodo,
      completed: false
    };

    setTodos([...todos, todo]);
    setNewTodo('');
  };

  const handleEditTodo = (id) => {
    if (editedTodoTitle.trim() === '') {
      return;
    }

    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          title: editedTodoTitle
        };
      }
      return todo;
    });

    setTodos(updatedTodos);
    setEditTodoId(null);
    setEditedTodoTitle('');
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleEditInputChange = (event) => {
    setEditedTodoTitle(event.target.value);
  };

  const handleEditInputBlur = () => {
    setEditTodoId(null);
    setEditedTodoTitle('');
  };

  const handleToggleCompletion = (id) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed
        };
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const filteredTodos = filter === 'completed'
    ? todos.filter(todo => todo.completed)
    : todos;

  return (
    <div id="div1">
      <h1>Todo App</h1>

      <div>
        <input
          type="text"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          placeholder="Enter a new task" className='input1'
        />
        <button className='Add' onClick={handleAddTodo}>Add</button>
      </div>

      <div>
        <button className='btn1' onClick={() => handleFilterChange('all')}>All</button>
        <button className='btn2' onClick={() => handleFilterChange('completed')}>Completed</button>
      </div>

      <ol>
        {filteredTodos.map(todo => (
          <li key={todo.id}>
            {editTodoId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editedTodoTitle}
                  onChange={handleEditInputChange}
                  onBlur={handleEditTodo.bind(null, todo.id)}
                  placeholder='Update the task'
                  className='input2'
                />
                <button onClick={handleEditTodo.bind(null, todo.id)} className='btn3'>Save</button>
              </>
            ) : (
              <>
                <span
                  style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? 'yellow' : 'black'
                  }}
                  onClick={() => handleToggleCompletion(todo.id)}
                >
                  {todo.title}
                </span>
                <button onClick={() => setEditTodoId(todo.id)} className='btn4'>Edit</button>
              </>
            )}
            <button onClick={() => handleDeleteTodo(todo.id)} className='btn5'>Delete</button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default App;
