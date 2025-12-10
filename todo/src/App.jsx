import Home from "./pages/Home"
import Completed from "./pages/Completed";
import Missed from "./pages/Missed";
import NavBar from "./components/NavBar"
import {Routes, Route} from 'react-router-dom';
import { useTodo } from "./contexts/TodoContext";
import TaskModal from "./modals/TaskModal";

function App() {
  const {taskModalOpen, setTaskModalOpen} = useTodo();

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/completed" element={<Completed/>}/>
        <Route path="/missed" element={<Missed/>}/>
      </Routes>

      <TaskModal isOpen={taskModalOpen} onClose={() => setTaskModalOpen(false)}/>
    </div>
  )
}

export default App;
