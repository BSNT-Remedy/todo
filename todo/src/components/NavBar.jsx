import { Link } from "react-router-dom"
import '../css/NavBar.css'

function NavBar() {
    return <nav className="nav-bar">
        <div className="nav-app">
            <Link to="/" className="nav-app-link">Todo App</Link>
        </div>

        <div className="navbar-links">
            <Link to="/" className="nav-links">Ongoing</Link>
            <Link to="/completed" className="nav-links">Completed</Link>
            <Link to="/missed" className="nav-links">Missed</Link>
        </div>
    </nav>
}

export default NavBar;