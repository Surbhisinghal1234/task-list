import { useContext, useState } from "react";
import { TodoContext } from "../context/ToDoContext";
import { useNavigate } from "react-router-dom";


function TaskForm() {
 
  const { task, setTask } = useContext(TodoContext); 



  const navigate = useNavigate(); 
 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => [{
      ...prevTask,
      [name]: value,
    }]);
  };

  const handleSave = async (e) => {
    e.preventDefault();
  
    setTask((prevTasks) => [...prevTasks, task]);

    try {
      const response = await fetch("https://task-list-rcdy.onrender.com/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
  
      const data = await response.json();
      if (response.status === 201) {
        setSuccessMessage("Task Added Successfully");

        setTask([{
          heading: "",
          description: "",
          deadlineDate: "",
          deadlineTime: "",
          status: "todo",
          assignee: "",
        }]);
       
        navigate("/taskList");
      } else {
        alert("Error creating task");
      }
    } catch (error) {
      alert("Error creating task");
      console.error(error);
    }
  };

 
  const handleShowForm = () => {
    setShowForm(true);
    setSuccessMessage("");
  };

  return (
    <>
      <div className="task h-[67.5vh] flex justify-center items-center rounded-md px-4">
       
          <div className=" ">
            <form onSubmit={handleSave} className="flex gap-3 flex-col">
              <div className="flex gap-11 items-center">
                <label>Heading:</label>
                <input
                  type="text"
                  name="heading"
                  value={task.heading}
                  onChange={handleInputChange}
                  placeholder="Task Heading"
                  className="border p-2 rounded-md"
                />
              </div>

              <div className="flex gap-6 items-center">
                <label>Description:</label>
                <textarea
                  name="description"
                  value={task.description}
                  onChange={handleInputChange}
                  placeholder="Task Description"
                  className="border w-[12.4rem] p-2 rounded-md"
                />
              </div>

              <div className="flex gap-2 items-center">
                <label>Deadline Date:</label>
                <input
                  type="date"
                  name="deadlineDate"
                  value={task.deadlineDate}
                  onChange={handleInputChange}
                  className="border p-2 rounded-md"
                />
              </div>

              <div className="flex gap-2 items-center">
                <label>Deadline Time:</label>
                <input
                  type="time"
                  name="deadlineTime"
                  value={task.deadlineTime}
                  onChange={handleInputChange}
                  className="border p-2 rounded-md"
                />
              </div>

              <div className="flex gap-16 items-center">
                <label>Status:</label>
                <select
                  name="status"
                  value={task.status}
                  onChange={handleInputChange}
                  className="border p-2 rounded-md"
                >
                  <option value="todo">Todo</option>
                  <option value="in-progress">In Progress</option>
                  <option value="complete">Complete</option>
                </select>
              </div>

              <div className="flex gap-10 items-center">
                <label>Assign to:</label>
                <input
                  type="text"
                  name="assignTo"
                  value={task.assignTo}
                  onChange={handleInputChange}
                  placeholder="Assign to"
                  className="border p-2 rounded-md"
                />
              </div>

              <button type="submit" className="bg-slate-900 text-white p-2 rounded-md mt-4">
                Save
              </button>
            </form>
          </div>

        
      </div>
    </>
  );
}

export default TaskForm;


