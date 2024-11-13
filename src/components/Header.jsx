import { useContext } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../CurrentUser";

export default function Header () {
    const {setCurrentUser} = useContext(CurrentUserContext)
    
    function resetUser() {
        localStorage.removeItem("userDetails")
        setCurrentUser("guest")
        localStorage.setItem("userDetails", "guest")
    }

    return(
        <div className="header__box">
            <h1>NC NEWS</h1>
            <nav>
            <button><Link to="/home">Home</Link></button>
            <button><Link to="/topics">Topics</Link></button>
            <button onClick={resetUser}><Link to="/">Logout</Link></button>
            </nav>
        </div>
    )
}