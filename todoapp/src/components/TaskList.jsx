// components/TaskList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);  // Track loading state
  const [error, setError] = useState(null);  // Track error state

  // Fetch tasks from the backend
  useEffect(() => {
    setIsLoading(true);  // Set loading to true when fetching data
    axios.get("http://localhost:8000/api/tasks")
      .then(response => {
        setTasks(response.data);
        setIsLoading(false);  // Set loading to false after data is fetched
      })
      .catch(error => {
        setError("Failed to fetch tasks. Please try again later.");
        setIsLoading(false);  // Set loading to false on error
      });
  }, []);

  // Filtered tasks based on the filter state (active, completed, or all)
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true; // all tasks
  });

  // Count of tasks (total, active, completed)
  const taskCount = {
    total: tasks.length,
    active: tasks.filter((task) => !task.completed).length,
    completed: tasks.filter((task) => task.completed).length,
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Task Management</h1>

      {/* Task Form */}
      <TaskForm setTasks={setTasks} />

      {/* Task Filter */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setFilter("all")}
          className="py-2 px-4 bg-gray-200 rounded-full text-lg font-medium hover:bg-yellow-500 hover:text-white transition duration-300"
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          className="py-2 px-4 bg-gray-200 rounded-full text-lg font-medium hover:bg-yellow-500 hover:text-white transition duration-300"
        >
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          className="py-2 px-4 bg-gray-200 rounded-full text-lg font-medium hover:bg-yellow-500 hover:text-white transition duration-300"
        >
          Completed
        </button>
      </div>

      {/* Task Count */}
      <div className="text-center text-lg font-semibold mb-8">
        {`Total: ${taskCount.total} | Active: ${taskCount.active} | Completed: ${taskCount.completed}`}
      </div>

      {/* Loading Spinner */}
      {isLoading && (
        <div className="flex justify-center mb-6">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-yellow-500 border-solid"></div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-200 text-red-800 p-4 rounded mb-6 text-center">
          {error}
        </div>
      )}

      {/* Task List */}
      <ul className="space-y-4">
        {filteredTasks.map((task) => (
          <TaskItem key={task._id} task={task} setTasks={setTasks} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
