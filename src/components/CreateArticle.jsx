import { useContext, useEffect, useState } from "react"
import { getTopics, getUserByUsername, postArticle } from "../api"
import { useNavigate } from "react-router-dom"
import Loading from "./Loading"

export default function CreateArticle() {
    const navigate = useNavigate()
    const [articleTitle, setArticleTitle] = useState("")
    const [articleBody, setArticleBody] = useState("")
    const [topicList, setTopicList] = useState([])
    const [topic, setTopic] = useState("")
    const [articleImage, setArticleImage] = useState("")
    const [userDetails, setUserDetails] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const username = localStorage.getItem("userDetails")

    useEffect(() => {
        setIsLoading(true)
        setError(null)

        const fetchData = async () => {
            try {
                const userResponse = await getUserByUsername(username)
                setUserDetails(userResponse.user)

                const topicResponse = await getTopics()
                setTopicList(topicResponse.topics)
            }catch (err) {
                setError(err.message || "Could not fetch data. Try again later.")
            }finally {
                setIsLoading(false)
            }
        }

        fetchData();
    }, [username])
    
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
        <div className="flex items-center justify-center mt-4">
            <form className="flex flex-col items-center space-y-4 w-full max-w-3xl py-6 shadow-lg rounded-lg" onSubmit={handleSubmit}>
                <h1 className="text-indigo-600 font-bold text-3xl py-4">+ POST +</h1>
                <img src={userDetails.avatar_url} alt={`User avatar for ${userDetails.name}`} className="object-cover w-20 h-20 rounded-full border-solid border-2 border-slate-900" />
                <div className="flex flex-col space-y-4 items-end">
                <div className="flex space-x-2">
                    <label htmlFor="article_title" className="text-xl font-semibold text-gray-700">Title:</label>
                    <input id="article_title" className="w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-2/3 border-solid border-2 border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-600" value={articleTitle} onChange={handleArticleTitle}/>
                </div>
                <div className="flex space-x-2">
                    <label htmlFor="article_body" className="text-xl font-semibold text-gray-700">Description:</label>
                    <textarea
                        id="article_body"
                        value={articleBody}
                        onChange={handleArticleBody}
                        className="w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-2/3 h-32 border-2 border-solid border-slate-600 rounded-lg resize-none focus:ring-2 focus:ring-indigo-600"
                        placeholder="Write your description here..."
                    />
                </div>
                <div className="flex space-x-2">
                    <label htmlFor="topic" className="text-xl font-semibold text-gray-700">Topic:</label>
                    <select id="topic" value={topic} className="w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-2/3 border-2 border-solid border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-600" onChange={handleTopicSelect}>
                        <option value="">---</option>
                        {topicList.map((item, index) => {
                            return(
                                <option key={index} value={item.slug}>{item.slug}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="flex space-x-2">
                    <label htmlFor="article_image" className="text-xl font-semibold text-gray-700">Image:</label>
                    <input id="article_image" className="w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-2/3 border-solid border-2 border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-600" value={articleImage} onChange={handleArticleImage}/>
                </div>
                {articleImage && <img src={articleImage} alt="Image preview" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px' }} />}
                {error && <p>{error}</p>}
                </div>
                <button type="submit" className="py-3 px-6 mt-4 border-2 border-slate-600 bg-indigo-600 text-white rounded-lg text-lg font-semibold shadow-md hover:bg-indigo-600 focus:ring-4 focus:ring-indigo-300">Post</button>
            </form>
        </div>
    )
}