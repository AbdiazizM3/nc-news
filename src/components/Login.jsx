import { useEffect, useState } from "react";
import getUsernames from "../api";
import { Link, useParams } from "react-router-dom";
import Loading from "./Loading";

export default function Login () {
    const [usernames, setUsernames] = useState([])
    const [isLoading, setIsLoading] = useState(true)

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
                <h1>NC NEWS</h1>
                <h2>Pick a User</h2>
                <ul>
                {usernames.map((user, index) => {
                    return(
                        <li key={index} className="user-login-box">
                            <img src={user.avatar_url} alt="User avatar" id="user-avatar" />
                            <button><Link to={`${user.username}/topics`}>{user.username}</Link></button>
                        </li>
                    )
                })}
                </ul>
            </div>
        </article>
    )
}