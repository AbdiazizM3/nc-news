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
        <div className="bg-slate-600 text-slate-100 w-full">
            <h1 className="text-center">NC NEWS</h1>
            <nav className="flex justify-center space-x-4 py-2">
            <Link to="/home">
            <button className="bg-indigo-600 hover:bg-indigo-300 text-slate-100 py-2 px-4 rounded">Home</button>
            </Link>
            <Link to="/topics">
            <button className="bg-indigo-600 hover:bg-indigo-300 text-slate-100 py-2 px-4 rounded">Topics</button>
            </Link>
            <Link to="/">
            <button onClick={resetUser} className="bg-indigo-600 hover:bg-indigo-300 text-slate-100 py-2 px-4 rounded">Logout</button>
            </Link>
            </nav>
        </div>
    )
}