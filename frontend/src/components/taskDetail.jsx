
import React, { useEffect, useState } from "react";
import axios from "axios";

function TaskDetail() {
  const [taskCounts, setTaskCounts] = useState({
    total: 0,
    active: 0,
    completed: 0,
  });

  useEffect(() => {
    axios
      .get("https://task-list-rcdy.onrender.com/tasks")
      .then((response) => {
        const { todo, inProgress, completed } = response.data;

        const totalTasks = todo.length + inProgress.length + completed.length;
        const activeTasks = todo.length + inProgress.length;
        const completedTasks = completed.length;

        setTaskCounts({
          total: totalTasks,
          active: activeTasks,
          completed: completedTasks,
        });
      })
      .catch((error) => {
        console.error("Error fetching task summary:", error);
      });
  }, []);

  return (
    <>
      

    <div className="task-summary flex flex-col lg:flex-col sm:flex-row gap-4 rounded-md text-center justify-center lg:justify-normal">

      <p className="bg-gray-200 task sm:w-[33%] md:w-full  px-2 py-8 rounded-md"> <span className="text-2xl font-semibold flex flex-col justify-start">Total Tasks:</span> <span className="text-3xl font-bold">{taskCounts.total}</span> </p>

      <p className="bg-gray-200 sm:w-[33%] md:w-full  task px-2 py-8 rounded-md"><span className="text-2xl font-semibold flex flex-col justify-start">Active Tasks</span> <span className="text-3xl font-bold"> {taskCounts.active}/{taskCounts.total}</span></p>

      <p className="bg-gray-200 sm:w-[33%] md:w-full task px-2 py-8  rounded-md"><span className="text-2xl font-semibold flex flex-col justify-start">Completed Tasks:</span> <span className="text-3xl font-bold"> {taskCounts.completed}/{taskCounts.total}</span> </p>
      
    </div>
    </>

  );
}

export default TaskDetail;