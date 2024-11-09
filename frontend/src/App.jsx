import { useState } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskDetail from "./components/taskDetail";
import { TodoProvider } from "./context/ToDoContext";

function App() {


  return (
    <>
    <TodoProvider>
      <div className="flex gap-4 my-4 mx-4 ">


        <div className="flex flex-col gap-4 w-[30%]">
          <TaskDetail />
          <TaskForm />
        </div>

        <TaskList className="w-[70%]" />

      </div>
      </TodoProvider>

    </>
  );
}

export default App;