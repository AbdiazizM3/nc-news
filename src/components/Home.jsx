import { useState } from "react"
import Error from "./Error"

export default function Home ({currentUser}) {
    const [comments, setComments] = useState([])
    const [error, setError] = useState(null)

    if(currentUser === "guest"){
        setError("Please sign in to see your home page")
    }

    if(error){
       return <Error message={error}/>
    }

    return (
        <article>
            <div>
                <h2>Welcome back {currentUser}</h2>
            </div>
        </article>
    )
}