import { useState } from "react";

function TaskForm() {
  const [task, setTask] = useState([{
    heading: "",
    description: "",
    deadlineDate: "",
    deadlineTime: "",
    status: "todo",
    assignee: "",
  }]);

  const [tasks, setTasks] = useState([]);
  const [successMessage, setSuccessMessage] = useState(""); 
  const [showForm, setShowForm] = useState(false); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => [{
      ...prevTask[0],
      [name]: value,
    }]);
  };

  const handleSave = async (e) => {
    e.preventDefault();
  
    setTasks((prevTasks) => [...prevTasks, task[0]]);

    try {
      const response = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task[0]),
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
        setShowForm(false);
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
      <div className="task flex justify-center items-center ">
        {successMessage ? (
          <div className="bg-green-200 p-4 rounded-md text-center">
            <p>{successMessage}</p>
            <button onClick={handleShowForm} className="mt-4 bg-gray-500 text-white p-2 rounded-md">
              Add Another Task
            </button>
          </div>
        ) : showForm ? (
          <div className="bg-white  p-6 rounded-md shadow-lg transform -translate-y-4">
            <form onSubmit={handleSave} className="flex gap-3 flex-col">
              <div className="flex gap-2">
                <label>Heading:</label>
                <input
                  type="text"
                  name="heading"
                  value={task[0].heading}
                  onChange={handleInputChange}
                  placeholder="Task Heading"
                  className="border p-2 rounded-md"
                />
              </div>

              <div className="flex gap-2">
                <label>Description:</label>
                <textarea
                  name="description"
                  value={task[0].description}
                  onChange={handleInputChange}
                  placeholder="Task Description"
                  className="border p-2 rounded-md"
                />
              </div>

              <div className="flex gap-2">
                <label>Deadline Date:</label>
                <input
                  type="date"
                  name="deadlineDate"
                  value={task[0].deadlineDate}
                  onChange={handleInputChange}
                  className="border p-2 rounded-md"
                />
              </div>

              <div className="flex gap-2">
                <label>Deadline Time:</label>
                <input
                  type="time"
                  name="deadlineTime"
                  value={task[0].deadlineTime}
                  onChange={handleInputChange}
                  className="border p-2 rounded-md"
                />
              </div>

              <div className="flex gap-2">
                <label>Status:</label>
                <select
                  name="status"
                  value={task[0].status}
                  onChange={handleInputChange}
                  className="border p-2 rounded-md"
                >
                  <option value="todo">Todo</option>
                  <option value="in-progress">In Progress</option>
                  <option value="complete">Complete</option>
                </select>
              </div>

              <div className="flex gap-2">
                <label>Assign to:</label>
                <input
                  type="text"
                  name="assignee"
                  value={task[0].assignee}
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
        ) : (
          <button onClick={handleShowForm} className="bg-gray-800 text-white px-4 py-2 rounded-md mt-4">
            Add Task
          </button>
        )}
      </div>
    </>
  );
}

export default TaskForm;
