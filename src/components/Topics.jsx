import { useEffect, useState } from "react"
import { getTopics } from "../api"
import { Link, useParams } from "react-router-dom"
import Loading from "./Loading"

export default function Topics ({currentUser, setCurrentUser}) {
    const [topics, setTopics] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    if(currentUser === ""){
        setCurrentUser("guest")
    }

    useEffect(() => {
        getTopics().then(({topics}) => {
            setTopics(topics)
            setIsLoading(false)
        })
    }, [])

    if(isLoading){
        return <Loading />
    }

    return(
        <article>
            <div>
                <ul>
                    {topics.map((topic, index) => {
                        return(
                            <li key={index}>
                                <button><Link to={`/${currentUser}/${topic.slug}/articles`}>{topic.slug}</Link></button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </article>
    )
}