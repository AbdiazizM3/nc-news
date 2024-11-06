import { useEffect, useState } from "react"
import { getTopics } from "../api"

export default function Topics ({setTopic}) {
    const [topics, setTopics] = useState([])

    function pickTopic (event) {
        setTopic(event.target.value)
    }

    useEffect(() => {
        getTopics().then(({topics}) => {
            setTopics(topics)
        })
    }, [])

    return(
        <div id="topic-drop" onChange={pickTopic}>
            <label htmlFor="topics"></label>
            <select name="topics" id="topics">
                <option value="">All</option>
            {topics.map((topic, index) => {
                return(
                <option key={index} value={topic.slug}>{topic.slug}</option>
                )
            })}
            </select>
        </div>
    )
}