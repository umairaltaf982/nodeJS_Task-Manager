const express = require("express");
const taskRoutes = require("./routes/taskRoutes"); // Import routes

const app = express();
const PORT = 5001;

app.use(express.json()); // Enable JSON body parsing

app.use("/tasks", taskRoutes); // ✅ Use the task routes

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
