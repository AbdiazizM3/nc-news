import { Link } from "react-router-dom";

export default function Header ({setCurrentUser}) {
    function resetUser() {
        setCurrentUser("guest")
    }

    return(
        <div>
            <h1>NC NEWS</h1>
            <nav>
            <button><Link to="/home">Home</Link></button>
            <button><Link to="/topics">Topics</Link></button>
            <button onClick={resetUser}><Link to="/">Logout</Link></button>
            </nav>
        </div>
    )
}