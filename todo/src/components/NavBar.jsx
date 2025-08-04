import { Link } from "react-router-dom"
import '../css/NavBar.css'

function NavBar() {
    return <nav className="nav-bar">
        <div>
            <Link to="/">Todo App</Link>
        </div>

        <div className="navbar-links">
            <Link to="/">Ongoing</Link>
            <Link to="/completed">Completed</Link>
            <Link to="/missed">Missed</Link>
        </div>
    </nav>
}

export default NavBar;