import { useEffect, useState } from "react";
import getUsernames from "../api";
import { Link } from "react-router-dom";
import Loading from "./Loading";

export default function Login ({setCurrentUser, setUserDetails}) {
    const [usernames, setUsernames] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    function selectUser (event) {
        setCurrentUser(event.currentTarget.value)
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
                        <li key={index} className="user-login-box">
                            <img src={user.avatar_url} alt="User avatar" id="user-avatar" />
                            <button onClick={selectUser} value={user.username}><Link to={`${user.username}/articles`}>{user.username}</Link></button>
                        </li>
                    )
                })}
                </ul>
            </div>
        </article>
    )
}