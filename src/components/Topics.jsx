import { useEffect, useState } from "react"
import { getTopics } from "../api"
import { Link } from "react-router-dom"

export default function Topics ({currentUser}) {
    const [topics, setTopics] = useState([])

    useEffect(() => {
        getTopics().then(({topics}) => {
            setTopics(topics)
        })
    }, [])

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