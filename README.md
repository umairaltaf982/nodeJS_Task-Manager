# Task Manager API (Node.js & Express)

## 📌 Introduction
This project is a simple **Task Manager API** built using **Node.js and Express.js**. The API allows users to:
- Fetch all tasks (GET request)
- Add a new task (POST request)
- Delete a task (DELETE request)

This guide will walk through **every step**, explaining how we structured our project, why we used Node.js, and the role of each file.

---

## 🛠️ What is Node.js?
**Node.js** is a JavaScript runtime built on Chrome’s V8 JavaScript engine. It allows JavaScript to run on the **server-side**.

### **Why use Node.js?**
- It enables **server-side scripting** using JavaScript.
- Handles multiple requests efficiently with its **event-driven, non-blocking I/O model**.
- Used to build **APIs**, web apps, real-time applications, and much more.

---

## 📂 Project Folder Structure (Step-by-Step)

### **Step 1: Initialize Node.js Project**

Create a new folder and initialize a Node.js project:
```sh
mkdir task-manager
cd task-manager
npm init -y
```
This generates a `package.json` file.

📂 **Folder Structure after Step 1**:
```
task-manager/
│-- package.json           # Project metadata & dependencies
```

---

### **Step 2: Install Required Dependencies**
We install Express.js, a framework for building web applications and APIs:
```sh
npm install express
```

📂 **Folder Structure after Step 2**:
```
task-manager/
│-- node_modules/          # Installed dependencies
│-- package.json           # Project metadata & dependencies
│-- package-lock.json      # Locks package versions
```

---

### **Step 3: Create `server.js` (Main Entry File)**

```js
const express = require("express");
const app = express();
const taskRoutes = require("./routes/taskRoutes");

app.use(express.json()); // Middleware to parse JSON requests
app.use("/tasks", taskRoutes); // Mount task routes

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
```

📂 **Folder Structure after Step 3**:
```
task-manager/
│-- node_modules/          # Installed dependencies
│-- package.json           # Project metadata & dependencies
│-- package-lock.json      # Locks package versions
│-- server.js              # Entry point of our application
```

---

### **Step 4: Create `routes/taskRoutes.js`**

Create a `routes/` directory and add `taskRoutes.js` inside it:
```sh
mkdir routes
```

📂 **Folder Structure after Step 4**:
```
task-manager/
│-- node_modules/          # Installed dependencies
│-- package.json           # Project metadata & dependencies
│-- package-lock.json      # Locks package versions
│-- server.js              # Entry point of our application
│-- routes/                # Stores all route handlers
│   └── taskRoutes.js      # API endpoints for managing tasks
```

Now, write the following code in `taskRoutes.js`:

```js
const express = require("express");
const fs = require("fs"); // File system to read/write tasks
const router = express.Router();

const filePath = "./tasks.json";

const readTasks = () => {
    try {
        const data = fs.readFileSync(filePath, "utf8"); // Read tasks
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

const writeTasks = (tasks) => {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2)); // Save tasks
};

router.get("/", (req, res) => {
    res.json(readTasks());
});

router.post("/", (req, res) => {
    const { task } = req.body;
    if (!task) return res.status(400).json({ error: "Task is required" });
    const tasks = readTasks();
    tasks.push(task);
    writeTasks(tasks);
    res.json({ message: "Task added successfully", tasks });
});

router.delete("/:index", (req, res) => {
    const tasks = readTasks();
    const index = parseInt(req.params.index);
    if (isNaN(index) || index < 0 || index >= tasks.length)
        return res.status(400).json({ error: "Invalid task index" });
    const deletedTask = tasks.splice(index, 1);
    writeTasks(tasks);
    res.json({ message: "Task deleted successfully", deletedTask, tasks });
});

module.exports = router;
```

📂 **Folder Structure after Step 4**:
```
task-manager/
│-- node_modules/          # Installed dependencies
│-- package.json           # Project metadata & dependencies
│-- package-lock.json      # Locks package versions
│-- server.js              # Entry point of our application
│-- routes/                # Stores all route handlers
│   └── taskRoutes.js      # API endpoints for managing tasks
│-- tasks.json             # Stores tasks (local database)
```

---

### **Step 5: Test API using Postman**

1️⃣ **Start the server:**
```sh
node server.js
```

2️⃣ **Test API Endpoints:**
- **GET `/tasks`** → Fetch all tasks
- **POST `/tasks`** → Add a new task
- **DELETE `/tasks/:index`** → Remove a task

---

### **Step 6: Stop the Server in Mac (if needed)**

```sh
pkill -f node
```

---

## 🎉 Congratulations! 🎉
You have successfully built a **Task Manager API using Node.js and Express.js!** 🚀