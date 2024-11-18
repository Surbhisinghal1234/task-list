import { useState } from "react";
import { createContext } from "react";

const TodoContext = createContext()

const TodoProvider = ({ children }) => {

    const [task, setTask] = useState({
        heading: "",
        description: "",
        deadlineDate: "",
        deadlineTime: "",
        status: "todo",
        assignTo: "",
      });

    return (
        <>
            <TodoContext.Provider value={{ task, setTask }}>

                {children}
            </TodoContext.Provider>
        </>
    )
}


export { TodoProvider, TodoContext }


