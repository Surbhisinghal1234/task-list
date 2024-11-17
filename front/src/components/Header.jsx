import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
    <div className='bg-[#192064] flex text-white justify-between px-10 py-4'>
        <h1 className='font-bold text-2xl'>LOGO</h1>
        <ul className='flex gap-10'>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/taskList">Task List</Link></li>
        </ul>
    </div>
    </>
  )
}

export default Header