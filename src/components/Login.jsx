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
            <div className="relative inline items-center justify-center w-12 h-12 sm:p-12 md:p-14 lg:p-16 mx-auto">
                <h2>Pick a User</h2>
                <ul>
                {usernames.map((user, index) => {
                    return(
                        <li key={index} className="flex w-20 h-20 mt-11 shadow-lg border-2">
                            <img src={user.avatar_url} alt="User avatar" id="user__avatar" />
                            <Link to="/home"><button onClick={selectUser} value={user.username}>{user.username}</button></Link>
                        </li>
                    )
                })}
                </ul>
            </div>
        </article>
    )
}