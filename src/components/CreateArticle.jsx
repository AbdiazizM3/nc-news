import { useEffect, useState } from "react"
import { getTopics, postArticle } from "../api"
import { useNavigate } from "react-router-dom"
import Loading from "./Loading"

export default function CreateArticle() {
    const navigate = useNavigate()
    const [articleTitle, setArticleTitle] = useState("")
    const [articleBody, setArticleBody] = useState("")
    const [topicList, setTopicList] = useState([])
    const [topic, setTopic] = useState("")
    const [articleImage, setArticleImage] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const username = localStorage.getItem("userDetails")

    useEffect(() => {
        setIsLoading(true)
        setError(null)

        const fetchData = async () => {
            try {
                const topicResponse = await getTopics()
                setTopicList(topicResponse.topics)
            }catch (err) {
                setError(err.message || "Could not fetch data. Try again later.")
            }finally {
                setIsLoading(false)
            }
        }

        fetchData();
    }, [])
    
    function handleSubmit(event) {
        event.preventDefault()
        postArticle(username, articleTitle, articleBody, topic, articleImage).then(() => {
            navigate(-1)
        })
        .catch((err) => {
            setError("Failed to post comment")
        })
    }

    function handleArticleTitle(event) {
        setArticleTitle(event.target.value)
    }

    function handleArticleBody(event) {
        setArticleBody(event.target.value)
    }

    function handleTopicSelect(event) {
        setTopic(event.target.value)
    }

    function handleArticleImage(event) {
        setArticleImage(event.target.value)
    }

    if(isLoading){
        return <Loading />
    }

    return(
        <div className="flex items-center justify-center min-h-screen">
            <form className="flex flex-col items-center space-y-4 w-full max-w-3xl py-6 shadow-lg rounded-lg" onSubmit={handleSubmit}>
                <div className="flex space-x-2 mr-2">
                    <label htmlFor="article_title">Article Title:</label>
                    <input id="article_title" className="border-solid border-2 border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-600" value={articleTitle} onChange={handleArticleTitle}/>
                </div>
                <div className="flex space-x-2">
                    <p>Description:</p>
                    <textarea
                        id="article_body"
                        value={articleBody}
                        onChange={handleArticleBody}
                        className="w-full h-20 border-2 border-solid border-slate-600 rounded-lg resize-none focus:ring-2 focus:ring-indigo-600"
                        placeholder="Write your description here..."
                    />
                </div>
                <div className="flex space-x-2 mr-16">
                    <p>Topic:</p>
                    <select id="topic" value={topic} className="border-2 border-solid border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-600" onChange={handleTopicSelect}>
                        <option value="">---</option>
                        {topicList.map((item, index) => {
                            return(
                                <option key={index} value={item.slug}>{item.slug}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="flex space-x-2 ml-8">
                    <label htmlFor="article_image">Image:</label>
                    <input id="article_image" className="border-solid border-2 border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-600" value={articleImage} onChange={handleArticleImage}/>
                </div>
                {articleImage && <img src={articleImage} alt="Image preview" style={{ maxWidth: '200px', marginTop: '20px' }} />}
                {error && <p>{error}</p>}
                <button type="submit" className="border-solid border-2 border-slate-600 bg-indigo-600 hover:bg-indigo-300 text-slate-100 px-4 rounded-lg">Post</button>
            </form>
        </div>
    )
}