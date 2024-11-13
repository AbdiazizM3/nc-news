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
            <div>
                <h2>Pick a User</h2>
                <ul>
                {usernames.map((user, index) => {
                    return(
                        <li key={index} className="user__login">
                            <img src={user.avatar_url} alt="User avatar" id="user__avatar" />
                            <button onClick={selectUser} value={user.username}><Link to="/home">{user.username}</Link></button>
                        </li>
                    )
                })}
                </ul>
            </div>
        </article>
    )
}