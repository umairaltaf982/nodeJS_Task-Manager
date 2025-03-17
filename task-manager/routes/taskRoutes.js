const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const filePath = path.join(__dirname, "../tasks.json");

// Function to Read Tasks
const readTasks = () => {
    try {
        const data = fs.readFileSync(filePath, "utf8");
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

// Render Home Page with Tasks
router.get("/", (req, res) => {
    const tasks = readTasks();
    res.render("index", { tasks });
});

// Add New Task (POST Request)
router.post("/add", (req, res) => {
    const { task } = req.body;
    if (!task) return res.status(400).send("Task is required");

    const tasks = readTasks();
    tasks.push(task);
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));

    res.redirect("/");
});

// Delete Task
router.get("/delete/:index", (req, res) => {
    const tasks = readTasks();
    const index = parseInt(req.params.index);

    if (isNaN(index) || index < 0 || index >= tasks.length)
        return res.status(400).send("Invalid task index");

    tasks.splice(index, 1);
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));

    res.redirect("/");
});

module.exports = router;
