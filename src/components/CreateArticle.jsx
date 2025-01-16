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
    const [articleImage, setArticleImage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [preview, setPreview] = useState(null)
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

    function handleSubmit() {
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
        const file = event.target.files[0]
        setArticleImage(file)

        const fileReader = new FileReader()

        fileReader.onloadend = () => {
            setPreview(fileReader.result)
        }
        fileReader.readAsDataURL(file)
    }

    if(isLoading){
        return <Loading />
    }

    return(
        <div className="flex items-center justify-center min-h-screen">
            <form className="flex flex-col items-center space-y-4 w-full max-w-3xl py-6 shadow-lg rounded-lg" onSubmit={handleSubmit}>
                <div className="flex space-x-2 mr-2">
                    <label htmlFor="article_title">Article Title:</label>
                    <input className="border-solid border-2 border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-600" value={articleTitle} onChange={handleArticleTitle}/>
                </div>
                <div className="flex space-x-2">
                    <p>Description:</p>
                    <textarea
                        value={articleBody}
                        onChange={handleArticleBody}
                        className="w-full h-20 border-2 border-solid border-slate-600 rounded-lg resize-none focus:ring-2 focus:ring-indigo-600"
                        placeholder="Write your description here..."
                    />
                </div>
                <div className="flex space-x-2 mr-16">
                    <p>Topic:</p>
                    <select name="topic" value={topic} className="border-2 border-solid border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-600" onChange={handleTopicSelect}>
                        <option value="">---</option>
                        {topicList.map((item, index) => {
                            return(
                                <option key={index} value={item.slug}>{item.slug}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="flex space-x-2 ml-8">
                    <label htmlFor="article_title">Image:</label>
                    <input className="border-solid border-2 border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-600" type="file" accept="image/*" onChange={handleArticleImage}/>
                </div>
                {preview && <img src={preview} alt="Image preview" style={{ maxWidth: '200px', marginTop: '20px' }} />}
                {error && <p>{error}</p>}
                <button type="submit" className="border-solid border-2 border-slate-600 bg-indigo-600 hover:bg-indigo-300 text-slate-100 px-4 rounded-lg">Post</button>
            </form>
        </div>
    )
}