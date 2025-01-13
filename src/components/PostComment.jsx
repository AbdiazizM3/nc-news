import { useContext, useState } from "react"
import { postCommentById } from "../api"
import Error from "./Error"
import { CurrentUserContext } from "../CurrentUser"

export default function PostComment({id, setCommentStatus}) {
    const {currentUser} = useContext(CurrentUserContext)
    const [commentInput, setCommentInput] = useState([])
    const [error, setError] = useState(null)

    function handleCommentInput(event) {
        setCommentInput(event.target.value)
    }

    function handleCommentPost() {
        postCommentById(id, currentUser, commentInput).then(() => {
            setCommentStatus((currStatus) => {
                return !currStatus
            })
        })
        .catch((err) => {
            setError("Failed to post comment")
        })
        setCommentInput("")
    }

    if(error){
        return <Error message={error}/>
    }

    return(
        <div>
            <label htmlFor="comment">Comment: </label>
            <input className="border-solid border-2 border-slate-600" type="comment" id="comment" value={commentInput} onChange={handleCommentInput}/>
            <button className="border-solid border-2 border-slate-600 bg-indigo-600 hover:bg-indigo-300 text-slate-100 px-4 py-2 shadow-lg rounded-lg ml-2" onClick={handleCommentPost}>Post</button>
        </div>
    )
}