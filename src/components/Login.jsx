import { useContext, useEffect, useState } from "react";
import getUsernames from "../api";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { CurrentUserContext } from "../CurrentUser";

export default function Login () {
    const {setCurrentUser} = useContext(CurrentUserContext)
    const [usernames, setUsernames] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    function selectUser (event) {
        setCurrentUser(event.currentTarget.value)
        localStorage.setItem("userDetails", event.currentTarget.value)
    }

    useEffect(() => {
        getUsernames().then(({users}) => {
            setUsernames(users)
            setIsLoading(false)
        })
    }, [])

    if(isLoading){
        return <Loading />
    }

    return(
        <article>
            <div className="flex flex-col justify-center items-center space-y-4 w-full px-4 py-6">
                <h2 className="font-bold">Pick a User</h2>
                <ul className="space-y-4">
                {usernames.map((user, index) => {
                    return(
                    <li key={index} className="flex flex-col justify-center items-center space-y-12">
                        <Link to="/home">
                        <button onClick={selectUser} value={user.username}>
                            <img src={user.avatar_url} alt={`User avatar for ${user.username}`} id="user__avatar" className="object-cover w-20 h-20 rounded-full border-solid border-2 border-slate-600" />
                            <p className="text-center text-sm">{user.username}</p>
                        </button>
                        </Link>
                    </li>
                    )
                })}
                </ul>
            </div>
        </article>
    )
}