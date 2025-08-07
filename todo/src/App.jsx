import Home from "./pages/Home"
import Completed from "./pages/Completed";
import Missed from "./pages/Missed";
import NavBar from "./components/NavBar"
import {Routes, Route} from 'react-router-dom';
import { TodoProvider } from "./contexts/TodoContext";

function App() {
  return (
    <div>
      <TodoProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/completed" element={<Completed/>}/>
          <Route path="/missed" element={<Missed/>}/>
        </Routes>
      </TodoProvider>
    </div>
  )
}

export default App;
