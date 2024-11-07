import { Link } from "react-router-dom";

export default function Header ({currentUser, setCurrentUser}) {
    function resetUser() {
        setCurrentUser("guest")
    }

    return(
        <div>
            <h1>NC NEWS</h1>
            <nav>
            <button><Link to={`/${currentUser}/home`}>Home</Link></button>
            <button><Link to={`/${currentUser}/topics`}>Topics</Link></button>
            <button onClick={resetUser}><Link to="/">Logout</Link></button>
            </nav>
        </div>
    )
}