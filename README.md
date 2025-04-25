# Task Management App

## Project Overview

The **Task Management App** is a full-stack application built with **React**, **Express.js**, and **MongoDB**. This app allows users to manage tasks by creating, updating, deleting, and marking them as completed. It also provides a frontend interface to interact with the tasks and a backend API to store and manage data.

This project showcases CRUD (Create, Read, Update, Delete) operations, error handling, and dynamic UI elements like loading spinners and task filters. The app also features task descriptions and due dates to make task management more efficient.

## Features

- **Task Creation**: Users can create new tasks by entering a name and description.
- **Task Management**:
  - Edit task name and description.
  - Mark tasks as completed.
  - Delete tasks.
- **Task Filters**:
  - Filter tasks by `All`, `Active`, or `Completed`.
- **Loading Spinner**: Displays a loading spinner while fetching tasks.
- **Error Handling**: Displays an error message if a request to fetch tasks fails.
- **Task Count**: Displays the total number of tasks, active tasks, and completed tasks.

## Application Flow

1. **Frontend (React)**:
   - **`TaskForm.jsx`**: A form for adding new tasks.
   - **`TaskList.jsx`**: Displays all tasks and provides filtering options.
   - **`TaskItem.jsx`**: Each task is displayed with the ability to edit, delete, or mark it as completed.
   - The frontend communicates with the backend using **Axios** for HTTP requests to create, update, and delete tasks.
   - A loading spinner is displayed while tasks are being fetched from the backend, and error messages are shown if there are any issues during the API requests.

2. **Backend (Express.js)**:
   - **`taskModel.js`**: Mongoose model for the task schema, including fields for task name, description, completion status, and timestamps.
   - **`taskController.js`**: Handles CRUD operations (Create, Read, Update, Delete) for tasks. It exposes endpoints like `GET /api/tasks`, `POST /api/tasks`, `PUT /api/tasks/:id`, and `DELETE /api/tasks/:id`.

3. **MongoDB**:
   - Tasks are stored in a **MongoDB** database, which the backend interacts with for creating, retrieving, updating, and deleting tasks.

## Technologies Used

- **Frontend**:
  - React
  - Tailwind CSS (for styling)
  - Axios (for HTTP requests)
- **Backend**:
  - Express.js
  - MongoDB (for data storage)
  - Mongoose (for object modeling)
- **Tools**:
  - Vite (for fast development and bundling)

## How It Works

1. When the app starts, it fetches tasks from the backend using the `GET` API route.
2. Users can add tasks by entering a name and description in the form, which triggers a **POST** request to the backend.
3. Tasks can be marked as completed by checking a checkbox, which triggers a **PUT** request to update the task.
4. Users can delete tasks, which will remove them from both the frontend and the backend using a **DELETE** request.
5. Users can filter tasks based on their completion status.
6. If there's an issue fetching tasks or performing any operation, an error message will be displayed to the user.

## Error Handling

- A loading spinner is displayed while the frontend is fetching tasks from the backend.
- If there’s an error fetching tasks (e.g., network failure), an error message will be shown in the UI.

