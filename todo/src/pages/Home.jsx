import { useState, useEffect } from 'react'
import TaskCard from '../components/TaskCard';
import { useTodo } from '../contexts/TodoContext';
import '../css/Home.css'

function Home() {
  const {setTaskModalOpen} = useTodo();

  return (
    <div className="main-content">
      <h1>TODO APP</h1>
      <button 
        onClick={() => setTaskModalOpen(true)} 
        className='add-task-btn'
      >
        + New Task
      </button>

      <TaskCard/>
    </div>
  )
}

export default Home;
