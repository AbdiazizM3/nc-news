import { Link, useParams } from "react-router-dom";

export default function Header ({setCurrentUser}) {
    const {username} = useParams()

    function resetUser() {
        setCurrentUser("")
    }

    return(
        <div>
            <h1>NC NEWS</h1>
            <nav>
            <button><Link to={`/${username}/home`}>Home</Link></button>
            <button><Link to={`/${username}/topics`}>Topics</Link></button>
            <button onClick={resetUser}><Link to="/">Logout</Link></button>
            </nav>
        </div>
    )
}