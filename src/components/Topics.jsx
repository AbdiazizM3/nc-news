import { useEffect, useState } from "react"
import { getTopics } from "../api"
import { Link } from "react-router-dom"
import Loading from "./Loading"
import Error from "./Error"

export default function Topics () {
    const [topics, setTopics] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setIsLoading(true)
        getTopics().then(({topics}) => {
            setTopics(topics)
            setIsLoading(false)
        }).catch((err) => {
            setError("Could not find any topics :(")
            setIsLoading(false)
        })
    }, [])

    if(isLoading){
        return <Loading/>
    }

    if(error){
        return <Error message={error}/>
    }

    return(
        <div className="topic__list">
            <ul>
            {topics.map((topic, index) => {
                return(
                    <li key={index}>
                        <button><Link to={`/${topic.slug}/articles`}>{topic.slug}</Link></button>
                    </li>
                )
            })}
            </ul>
        </div>
    )
}