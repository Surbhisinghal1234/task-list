
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskDetail from "./components/taskDetail";
import { TodoProvider } from "./context/ToDoContext";

function App() {


  return (
    <>
    <TodoProvider>
      <div className="flex gap-4 my-4 mx-4 flex-col lg:flex-row ">


        <div className="flex flex-col  gap-4 md:flex-col lg:w-[30%]  ">
          <TaskDetail className="" />
          <TaskForm className="" />
        </div>

        <TaskList className="lg:w-[70%]" />

      </div>
      </TodoProvider>

    </>
  );
}

export default App;