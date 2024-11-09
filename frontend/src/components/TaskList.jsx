

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

function TaskList() {
  const [tasks, setTasks] = useState({ todo: [], inProgress: [], completed: [] });

  useEffect(() => {
    axios
      .get("https://task-list-rcdy.onrender.com/tasks")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  const deleteTask = (taskId) => {
    axios
      .delete(`https://task-list-rcdy.onrender.com/tasks/${taskId}`)
      .then(() => {
       
        setTasks((prevTasks) => {
          const updatedTasks = { ...prevTasks };
          updatedTasks.todo = updatedTasks.todo.filter((task) => task._id !== taskId);
          updatedTasks.inProgress = updatedTasks.inProgress.filter((task) => task._id !== taskId);
          updatedTasks.completed = updatedTasks.completed.filter((task) => task._id !== taskId);
          return updatedTasks;
        });
      })
      .catch((error) => {
        console.error("Error deleting task", error);
      });
  };

  return (
    <>
      <div className="flex justify-center gap-4 w-[100%]">
      
        <div className="flex task flex-col gap-4 rounded-lg p-4 bg-gray-200 items-center w-[30%]">
          <h3 className="text-2xl font-bold text-center">To Do</h3>
          {tasks.todo.length === 0 ? (
            <p>No tasks in To Do.</p>
          ) : (
            <ul className="flex flex-col gap-4">
              {tasks.todo.map((task) => (
                <li className="bg-white task py-4 px-6 rounded-md" key={task._id}>
                  <h4 className="font-bold"><span>Heading:</span> <span>{task.heading}</span> </h4>

                  <p><span className="font-semibold">Description:</span> <span>{task.description}</span> </p>
                  <p> <span className="font-semibold">Deadline:</span> <span> {task.deadlineDate} at {task.deadlineTime}</span></p>
                  <p> <span className="font-semibold">Assignee:</span> <span>{task.assignee}</span> </p>
                  <button
                    className="bg-red-500 text-white py-1 px-4 rounded-md mt-2"
                    onClick={() => deleteTask(task._id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        
        <div className="flex task flex-col gap-4 rounded-lg p-4 bg-gray-300 items-center w-[30%]">
          <h3 className="text-2xl font-bold text-center">In Progress</h3>
          {tasks.inProgress.length === 0 ? (
            <p>No tasks in Progress.</p>
          ) : (
            <ul className="flex flex-col gap-4">
              {tasks.inProgress.map((task) => (
                <li className="bg-white task py-4 px-6 rounded-md" key={task._id}>
                  <h4 className="font-bold"><span>Heading:</span> <span>{task.heading}</span> </h4>

                  <p><span className="font-semibold">Description:</span> <span>{task.description}</span> </p>

                  <p> <span className="font-semibold">Deadline:</span> <span> {task.deadlineDate} at {task.deadlineTime}</span></p>
                  <p> <span className="font-semibold">Assignee:</span> <span>{task.assignee}</span> </p>
                  <button
                    className="bg-red-500 text-white py-1 px-4 rounded-md mt-2"
                    onClick={() => deleteTask(task._id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

  
        <div className="flex task flex-col bg-gray-300 rounded-lg gap-4 p-4 items-center w-[30%]">
          <h3 className="text-2xl font-bold text-center">Completed</h3>
          {tasks.completed.length === 0 ? (
            <p>No tasks completed.</p>
          ) : (
            <ul className="flex flex-col gap-4">
              {tasks.completed.map((task) => (
                <li className="bg-white task py-4 px-6 rounded-md" key={task._id}>
                  <h4 className="font-bold"><span>Heading:</span> <span>{task.heading}</span> </h4>
                  <p><span className="font-semibold">Description:</span> <span>{task.description}</span> </p>

                  <p> <span className="font-semibold">Deadline:</span> <span> {task.deadlineDate} at {task.deadlineTime}</span></p>
                  <p> <span className="font-semibold">Assignee:</span> <span>{task.assignee}</span> </p>
                  <button
                    className="bg-red-500 text-white py-1 px-4 rounded-md mt-2"
                    onClick={() => deleteTask(task._id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default TaskList;


