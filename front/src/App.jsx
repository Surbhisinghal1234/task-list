import { useState } from 'react'

import './App.css'
import { TodoProvider } from './context/ToDoContext'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import TaskDetail from './components/TaskDetails'
import { createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout'
import { RouterProvider } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  const router = createBrowserRouter(
    [
      {
        path:"/",
        element: <Layout/>,
        children:[
          {
            index:true,
            element: <TaskForm/>
          },
          {
            path:"/taskList",
            element: <TaskList/>
          },
        ]
      }
    ]
  )

  return (
    <>
     
     <TodoProvider>
     {/* <div className="flex gap-4 my-4 mx-4 flex-col lg:flex-row ">

     <div className="flex flex-col  gap-4 md:flex-col lg:w-[30%]  ">

   <TaskDetail/>
      <TaskForm/>
      </div>

      <TaskList className="lg:w-[70%]" />
      </div> */}

<RouterProvider router={router}>

</RouterProvider>

     </TodoProvider>
    </>
  )
}

export default App
