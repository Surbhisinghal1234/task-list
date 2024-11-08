import React, { useEffect, useState } from "react";
import axios from "axios";

function TaskList() {
  const [tasks, setTasks] = useState({ todo: [], inProgress: [], completed: [] });

  useEffect(() => {
    axios.get("http://localhost:5000/tasks")
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  return (
    <>

<div className="flex justify-center gap-4 w-[100%]">

<div className="flex flex-col gap-4  rounded-lg p-4 bg-gray-200 items-center w-[30%]">
  <h3 className="text-2xl font-bold text-center">To Do</h3>
  {tasks.todo.length === 0 ? (
    <p>No tasks in To Do.</p>
  ) : (
    <ul className="flex flex-col gap-4">
      {tasks.todo.map((task) => (
        <li className="bg-white py-4 px-6 rounded-md" key={task._id}>
          <h4 className="font-bold">{task.heading}</h4>
          <p>{task.description}</p>
          <p>Deadline: {task.deadlineDate} at {task.deadlineTime}</p>
          <p>Assignee: {task.assignee}</p>
        </li>
      ))}
    </ul>
  )}
</div>

<div className="flex flex-col gap-4  rounded-lg p-4 bg-gray-300 items-center w-[30%]">
  <h3 className="text-2xl font-bold text-center">In Progress</h3>
  {tasks.inProgress.length === 0 ? (
    <p>No tasks in Progress.</p>
  ) : (
    <ul className="flex flex-col gap-4">
      {tasks.inProgress.map((task) => (
        <li className="bg-white   py-4 px-6 rounded-md" key={task._id}>
          <h4 className="font-bold">{task.heading}</h4>
          <p>{task.description}</p>
          <p>Deadline: {task.deadlineDate} at {task.deadlineTime}</p>
          <p>Assignee: {task.assignee}</p>
        </li>
      ))}
    </ul>
  )}
</div>

<div className="flex flex-col bg-gray-300 rounded-lg gap-4  p-4 items-center w-[30%]">
  <h3 className="text-2xl font-bold text-center">Completed</h3>
  {tasks.completed.length === 0 ? (
    <p>No tasks completed.</p>
  ) : (
    <ul className="flex flex-col gap-4">
      {tasks.completed.map((task) => (
        <li className="bg-white   py-4 px-6 rounded-md" key={task._id}>
          <h4 className="font-bold">{task.heading}</h4>
          <p>{task.description}</p>
          <p>Deadline: {task.deadlineDate} at {task.deadlineTime}</p>
          <p>Assignee: {task.assignee}</p>
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
