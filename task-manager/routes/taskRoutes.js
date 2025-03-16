const express = require("express");
const fs = require("fs"); // Import the file system module to read and write JSON files
const router = express.Router();

const filePath = "./tasks.json"; // Path to JSON file

// Function to read tasks from JSON file
const readTasks = () => {
    try {
        const data = fs.readFileSync(filePath, "utf8"); // Read the JSON file
        return JSON.parse(data);
    } catch (error) {
        return []; // Return empty array if file doesn't exist
    }
};

// Function to write tasks to JSON file
const writeTasks = (tasks) => {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2)); // Write updated task list to file
};

// GET /tasks - Fetch all tasks
router.get("/", (req, res) => {
    const tasks = readTasks();
    res.json(tasks);
});

// POST /tasks - Add a task
router.post("/", (req, res) => {
    const { task } = req.body;
    if (!task) {
        return res.status(400).json({ error: "Task is required" });
    }

    const tasks = readTasks();
    tasks.push(task);
    writeTasks(tasks); // Save updated tasks to JSON file

    res.json({ message: "Task added successfully", tasks });
});

// DELETE /tasks/:index - Remove a task
router.delete("/:index", (req, res) => {
    const tasks = readTasks();
    const index = parseInt(req.params.index);

    if (isNaN(index) || index < 0 || index >= tasks.length) {
        return res.status(400).json({ error: "Invalid task index" });
    }

    const deletedTask = tasks.splice(index, 1);
    writeTasks(tasks); // Save updated tasks to JSON file after deletion

    res.json({ message: "Task deleted successfully", deletedTask, tasks });
});

module.exports = router;
