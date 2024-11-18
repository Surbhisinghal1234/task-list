import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';

const app = express();

app.use(express.json());
app.use(cors({
  origin: '*', 

}));
app.use(express.urlencoded({ extended: true }));
const username = process.env.MONGO_USERNAME;
const password = encodeURIComponent(process.env.MONGO_PASSWORD);
const dbName = "toDoApp"; 

mongoose.connect(
  `mongodb+srv://${username}:${password}@cluster0.3j0ywmp.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`
).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error', error);
});

// Task Model
const Task = mongoose.model('Task', new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  deadlineDate: {
    type: String,
    required: true,
  },
  deadlineTime: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["todo", "in-progress", "complete"],
    default: "todo",
  },
  assignTo: {
    type: String,
    required: true,
  },
}));

// POST Route 
app.post("/tasks", async (req, res) => {
  const { heading, description, deadlineDate, deadlineTime, status, assignTo } = req.body;

  try {
    const newTask = new Task({
      heading,
      description,
      deadlineDate,
      deadlineTime,
      status,
      assignTo,
    });

    await newTask.save(); 
    res.status(201).json(newTask); 
  } catch (error) {
    res.status(500).json({ error: "Error creating task" });
  }
});


app.get("/tasks", async (req, res) => {
  try {
    const todoTasks = await Task.find({ status: "todo" });
    const inProgressTasks = await Task.find({ status: "in-progress" });
    const completedTasks = await Task.find({ status: "complete" });

    res.status(200).json({
      todo: todoTasks,
      inProgress: inProgressTasks,
      completed: completedTasks,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching tasks" });
  }
});
// DELETE Route
app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndDelete(id); 
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting task" });
  }
});

app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { heading, description, deadlineDate, deadlineTime, status, assignTo } = req.body;

  try {
    // Find the task by ID and update it
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { heading, description, deadlineDate, deadlineTime, status, assignTo },
      { new: true, runValidators: true }
    );

    // If task is not found, return error
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Send the updated task as a response
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Server error while updating the task" });
  }
});
// Server
app.listen(5000, () => console.log('Server running on port 5000'));