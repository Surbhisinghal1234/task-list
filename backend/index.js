import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json()); 

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/taskdb').then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

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
  assignee: {
    type: String,
    required: true,
  },
}));

// POST Route 
app.post("/tasks", async (req, res) => {
  const { heading, description, deadlineDate, deadlineTime, status, assignee } = req.body;

  try {
    const newTask = new Task({
      heading,
      description,
      deadlineDate,
      deadlineTime,
      status,
      assignee,
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

// Server
app.listen(5000, () => console.log('Server running on port 5000'));
