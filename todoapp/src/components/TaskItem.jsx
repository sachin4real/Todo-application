// components/TaskItem.jsx
import React, { useState } from 'react';
import axios from 'axios';

const TaskItem = ({ task, setTasks }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTaskName, setEditedTaskName] = useState(task.name);
  const [editedTaskDesc, setEditedTaskDesc] = useState(task.description);

  // Mark task as completed
  const handleComplete = () => {
    axios.put(`http://localhost:8000/api/tasks/${task._id}`, { completed: !task.completed })
      .then((response) => {
        setTasks((prevTasks) => prevTasks.map(t => t._id === task._id ? response.data : t));
      })
      .catch((error) => {
        console.error('Error marking task as completed!', error);
      });
  };

  // Delete task
  const handleDelete = () => {
    axios.delete(`http://localhost:8000/api/tasks/${task._id}`)
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter(t => t._id !== task._id));
      })
      .catch((error) => {
        console.error('Error deleting task!', error);
      });
  };

  // Edit task (save name and description)
  const handleEdit = () => {
    const updatedTask = { name: editedTaskName, description: editedTaskDesc, completed: task.completed };
    axios.put(`http://localhost:8000/api/tasks/${task._id}`, updatedTask)
      .then((response) => {
        setTasks((prevTasks) => prevTasks.map(t => t._id === task._id ? response.data : t));
        setIsEditing(false); // Close editing mode after saving
      })
      .catch((error) => {
        console.error('Error editing task!', error);
      });
  };

  return (
    <li className="bg-white p-4 rounded-md shadow-md flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleComplete}
          className="mr-4"
        />
        {isEditing ? (
          <>
            <input
              type="text"
              value={editedTaskName}
              onChange={(e) => setEditedTaskName(e.target.value)}
              className="text-xl border p-2 rounded-md"
            />
            <input
              type="text"
              value={editedTaskDesc}
              onChange={(e) => setEditedTaskDesc(e.target.value)}
              className="text-xl border p-2 rounded-md"
            />
          </>
        ) : (
          <>
            <span className={`${task.completed ? 'line-through text-gray-500' : ''} text-xl`}>
              {task.name}
            </span>
            <span className="text-sm text-gray-500">{task.description}</span>
          </>
        )}
      </div>

      <div className="space-x-4">
        {/* Edit Button */}
        {isEditing ? (
          <button
            onClick={handleEdit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}  // Enable editing when clicked
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-300"
          >
            Edit
          </button>
        )}

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
