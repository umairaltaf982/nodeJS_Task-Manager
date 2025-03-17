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

## 🚀 What is Express.js & Why Are We Using It?

### **What is Express.js?**  
**Express.js** is a **minimal and flexible** web application framework for **Node.js**. It simplifies the process of handling HTTP requests and responses.

### **Why Are We Using Express.js?**  
1. **Simplifies Routing**  
   - Instead of manually handling HTTP requests using Node's built-in `http` module, Express provides a cleaner and more intuitive way to define routes.  
   - Example:  
     ```js
     app.get("/", (req, res) => {
         res.send("Hello, World!");
     });
     ```
     Without Express, this would require **more complex** code using Node’s `http` module.

2. **Built-in Middleware**  
   - Express has built-in middleware (like `express.json()`) that helps in **parsing request data** (e.g., JSON).
   - Without Express, we would manually parse incoming request bodies.

3. **Supports Routing and APIs Easily**  
   - Express makes it easy to create RESTful APIs.
   - Example of handling a GET request:
     ```js
     app.get("/users", (req, res) => {
         res.json([{ name: "Alice" }, { name: "Bob" }]);
     });
     ```
   - Without Express, we’d have to manually parse the URL, method, and response type.

4. **Middleware Support**  
   - Express allows **custom middleware**, which helps in tasks like logging, authentication, and error handling.

5. **Scalability & Performance**  
   - Express is **lightweight and fast**.  
   - It can handle large-scale applications efficiently.

---

### **Can We Run Node.js Without Express?**  
Yes, **Node.js can run without Express**. However, it requires **more manual work**. For example:

#### **Basic HTTP Server Without Express**  
```js
const http = require("http");

const server = http.createServer((req, res) => {
    if (req.url === "/" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Hello, World!");
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
    }
});

server.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
```
🔴 **Problems Without Express:**  
- We have to manually handle **routes, request types, and responses**.
- No built-in middleware for handling JSON or form data.
- Code becomes **longer** and **harder to maintain** as the project grows.

---

### **Is Express Necessary for Node.js?**  
❌ **Not necessary**, but ✅ **highly recommended** for:  
✔ **Simplifying HTTP handling**  
✔ **Creating REST APIs easily**  
✔ **Using middleware for authentication, logging, etc.**  
✔ **Better code readability & maintainability**  

So, while you **can** run Node.js without Express, **using Express is the best practice** for building web applications and APIs efficiently.

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

### **Step 7: Install & Use Nodemon (Auto Restart Server)**

Nodemon is a tool that **automatically restarts** the server whenever you make changes to the files. This eliminates the need to manually stop and restart the server.

#### **1️⃣ Install Nodemon Globally**
```sh
npm install -g nodemon
```

#### **2️⃣ Run the Server with Nodemon**
```sh
nodemon server.js
```

#### **3️⃣ Test Nodemon**
- Start the server using `nodemon server.js`
- Make a small change in `server.js`, like updating the console log message.
- Save the file, and **Nodemon will automatically restart the server!**

#### **4️⃣ Stop the Server (if needed)**
```sh
pkill -f node
```

---

## 🖥️ Step 7: Integrating EJS (Embedded JavaScript)

### What is EJS?
**EJS (Embedded JavaScript)** is a templating engine for Node.js that allows you to **generate dynamic HTML pages** using JavaScript.

### Why Use EJS?
- Helps **render dynamic data** in HTML.
- Supports **JavaScript logic** inside templates.
- Allows **code reusability** via partials.

---

# Task Manager with EJS  

## 📌 Step 8: Installing EJS  
Run the following command to install EJS in your project:  
```sh
npm install ejs
```

---

## 📌 Step 9: Updating `server.js` to Use EJS  
Modify `server.js` to configure EJS as the template engine:  

```js
const express = require("express");
const path = require("path");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// Set EJS as the template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // To parse form data

// Use Routes
app.use("/", taskRoutes);

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

```

---

## 📌 Step 10: Creating the `views/` Folder  

EJS templates are stored inside the `views/` folder. Create this directory:  
```sh
mkdir views
```

### Folder Structure Update:  
```
task-manager/
│-- views/
|      └── index.ejs                 
```

---

## 📌 Step 11: Writing HTML in `index.ejs`  

Create the `index.ejs` file inside the `views/` folder and add the following code:  

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Manager</title>
</head>
<body>
    <h1>Task Manager</h1>

    <section>
        <h2>Your Tasks</h2>

        <ul>
            <% tasks.forEach((task, index) => { %>
                <li>
                    <%= task %> 
                    <a href="/delete/<%= index %>">❌</a>
                </li>
            <% }) %>
        </ul>

        <form action="/add" method="POST">
            <input type="text" name="task" placeholder="Enter new task" required>
            <button type="submit">Add Task</button>
        </form>
    </section>
</body>
</html>

```
---

## 📌 Step 12: Writing CSS and JS and updating `index.ejs` and `server.js`
### Create a `public/` Folder 
To include **CSS styling** and **JS scripting**, we need a `public/` folder to store static files.

Run the following commands to create the necessary structure:

```sh
mkdir public
mkdir public/css
touch public/css/style.css
```

```sh
mkdir public/js
touch public/js/script.js
```
---

### 📂 Updated Folder Structure:
```
task-manager/
│-- public/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js   <-- JavaScript file
│-- views/
│   └── index.ejs
│-- routes/
│   └── taskRoutes.js
│-- tasks.json
│-- server.js
│-- package.json
│-- README.md

```
---

### Add Styling in `style.css`
* Write a css file in the `public/css/style.css`
* Write a js file in the `public/css/script.css`
---
### Update file named `server.js`
```js
const express = require("express");
const path = require("path");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// Set EJS as the template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // To parse form data
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

// Use Routes
app.use("/", taskRoutes);

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

```
---
### Update file named `index.ejs`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Manager</title>
    <link rel="stylesheet" href="/css/style.css"> <!-- Link CSS -->
</head>
<body>
    <h1>Task Manager</h1>

    <section>
        <h2>Your Tasks</h2>

        <ul>
            <% tasks.forEach((task, index) => { %>
                <li>
                    <%= task %> 
                    <a href="/delete/<%= index %>" class="delete-task">❌</a>
                </li>
            <% }) %>
        </ul>

        <form action="/add" method="POST">
            <input type="text" name="task" placeholder="Enter new task" required>
            <button type="submit">Add Task</button>
        </form>
    </section>

    <script src="/js/script.js"></script> <!-- Link JavaScript -->
</body>
</html>


```
---
### Restart and Run Server
You can do it by killing the server first by and restart node:
```sh
pkill -f node
node server.js
```
or by using nodemon
```sh
nodemon server.js
```


## 🎉 Congratulations! 🎉  
You have successfully built a **Task Manager** using **Node.js, Express, and EJS!** 🚀  

