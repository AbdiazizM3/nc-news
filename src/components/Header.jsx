import { Link } from "react-router-dom";

export default function Header () {
    return(
        <div>
            <h1>NC NEWS</h1>
            <nav>
            <button><Link to="/:username/home">Home</Link></button>
            <button><Link to="/">Logout</Link></button>
            </nav>
        </div>
    )
}