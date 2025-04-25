// components/TaskForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ setTasks }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDesc, setTaskDesc] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { name: taskName, description: taskDesc, completed: false };

    // Send POST request to backend to create a new task
    axios.post('http://localhost:8000/api/tasks', newTask)
      .then((response) => {
        setTasks((prevTasks) => [...prevTasks, response.data]);
        setTaskName('');
        setTaskDesc('');
      })
      .catch((error) => {
        console.error('Error creating task!', error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex space-x-4 justify-center">
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Task Name"
        required
        className="p-3 border rounded w-2/3"
      />
      <input
        type="text"
        value={taskDesc}
        onChange={(e) => setTaskDesc(e.target.value)}
        placeholder="Task Description"
        className="p-3 border rounded w-2/3"
      />
      <button type="submit" className="p-3 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition duration-300">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
