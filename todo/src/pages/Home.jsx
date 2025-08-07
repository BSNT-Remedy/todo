import { useState, useEffect } from 'react'
import TaskCard from '../components/TaskCard';
import TaskModal from '../modals/TaskModal';
import '../css/Home.css'

function Home() {
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  
  return (
    <div className="main-content">
      <h1>TODO APP</h1>
      <button onClick={() => setTaskModalOpen(true)}>+ New Task</button>
      <TaskModal isOpen={taskModalOpen} onClose={() => setTaskModalOpen(false)}/>
      <TaskCard/>
    </div>
  )
}

export default Home;
