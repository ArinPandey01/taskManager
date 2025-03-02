# Task Management App

This is a simple task management application built with Node.js, Express.js, MongoDB, and a frontend using HTML, CSS, and JavaScript.

## Features
- Add new tasks
- View all tasks
- Mark tasks as complete/incomplete
- Delete tasks

## Setup
1. Clone the repository:
    ```bash
    git clone <repo-url>
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file and add your MongoDB URL:
    ```env
    DB_URL=<your-mongodb-url>
    ```
4. Start the server:
    ```bash
    node server.js
    ```
5. Open `http://localhost:3000` in your browser.

## Folder Structure
```
project-root
|-- public
|   |-- index.html
|   |-- styles.css
|   |-- app.js
|-- routes
|   |-- taskRoutes.js
|-- controllers
|   |-- taskController.js
|-- models
|   |-- tasks.js
|-- db
|   |-- connection.js
|-- server.js
|-- .env
|-- package.json
```

## API Routes
- `GET /task/v1/` - Get all tasks
- `POST /task/v1/` - Add a new task
- `GET /task/v1/:id` - Get a single task by ID
- `PATCH /task/v1/:id` - Update a task by ID
- `DELETE /task/v1/:id` - Delete a task by ID
