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
        setError(null)

        const fetchData = async () => {
            try {
                const topicResponse = await getTopics()
                setTopics(topicResponse.topics)
            }catch (err) {
                setError(err.message || "Could not fetch data. Try again later.")
            }finally {
                setIsLoading(false)
            }
        }
        
        fetchData();
    }, [])

    if(isLoading){
        return <Loading/>
    }

    if(error){
        return <Error message={error}/>
    }

    return(
        <div className="flex justify-center items-center">
            <ul>
            {topics.map((topic, index) => {
                return(
                    <li key={index} className="flex">
                        <Link to={`/${topic.slug}/articles`}><button className="bg-indigo-600 hover:bg-indigo-300 border-solid border-2 border-indigo-600 text-slate-100 px-4 py-2 shadow-lg rounded-lg mt-4">{topic.slug}</button></Link>
                    </li>
                )
            })}
            </ul>
        </div>
    )
}