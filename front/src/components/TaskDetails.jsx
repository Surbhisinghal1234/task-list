
import React, { useEffect, useState } from "react";
import axios from "axios";

function TaskDetail() {
  const [taskCounts, setTaskCounts] = useState({
    total: 0,
    active: 0,
    completed: 0,
  });
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_BASE_URL;


  useEffect(() => {
    axios
      .get(`${API_URL}/tasks`)
      .then((response) => {
        const { todo = [], inProgress = [], completed = [] } = response.data; 
  
        const totalTasks = todo.length + inProgress.length + completed.length;
        const activeTasks = todo.length + inProgress.length;
        const completedTasks = completed.length;
  
        setTaskCounts({
          total: totalTasks,
          active: activeTasks,
          completed: completedTasks,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching task summary", error);
        setLoading(false); 
      });
  }, []);

  return (
    <>
      
      {loading ? (
      <div className="text-center">Loading...</div>
    ) : (
      <div className="task-summary grid sm:grid-cols-1 md:grid-cols-3 gap-4">
  <p className="bg-gray-200 px-2 py-8 rounded-md">
    <span className="text-2xl font-semibold">Total Tasks:</span>
    <span className="text-3xl font-bold">{taskCounts.total}</span>
  </p>

  <p className="bg-gray-200 px-2 py-8 rounded-md">
    <span className="text-2xl font-semibold">Active Tasks:</span>
    <span className="text-3xl font-bold">{taskCounts.active}/{taskCounts.total}</span>
  </p>

  <p className="bg-gray-200 px-2 py-8 rounded-md">
    <span className="text-2xl font-semibold">Completed Tasks:</span>
    <span className="text-3xl font-bold">{taskCounts.completed}/{taskCounts.total}</span>
  </p>
</div>  )}
    </>

  );
}

export default TaskDetail;