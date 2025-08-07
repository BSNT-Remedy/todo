import Home from "./pages/Home"
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
        </Routes>
      </TodoProvider>
    </div>
  )
}

export default App;
