import { useState } from "react"

export default function CreateArticle() {
    const [articleTitle, setArticleTitle] = useState("")
    const [articleBody, setArticleBody] = useState("")
    const [topic, setTopic] = useState("")

    // Need to useEffect to fetch topics

    function handleArticleTitle(event) {
        setArticleTitle(event.target.value)
    }

    function handleArticleBody(event) {
        setArticleBody(event.target.value)
    }

    function handleTopicSelect(event) {
        setTopic(event.target.value)
    }

    return(
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center space-y-4 w-full max-w-3xl py-6 shadow-lg rounded-lg">
                <div className="flex space-x-2">
                    <label htmlFor="article_title">Article Title: </label>
                    <input className="border-solid border-2 border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-600" type="article_title" id="article_title" value={articleTitle} onChange={handleArticleTitle}/>
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
                <div className="flex space-x-2">
                    <select name="topic" id="topic" value={topic} onChange={handleTopicSelect}></select>
                    {/* Need to make a map to loop through topics and format them as options */}
                </div>
            </div>
        </div>
    )
}