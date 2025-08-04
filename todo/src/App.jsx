import Home from "./pages/Home"
import NavBar from "./components/NavBar"
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </div>
  )
}

export default App;
