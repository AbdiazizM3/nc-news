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

    function handleCommentPost(event) {
        postCommentById(id, currentUser, commentInput).catch((err) => {
            setError("Failed to post comment")
        })
        setCommentInput("")
        setCommentStatus((currStatus) => {
            return !currStatus
        })
    }

    if(error){
        return <Error message={error}/>
    }

    return(
        <div className="comment__input">
            <label htmlFor="comment">Comment: </label>
            <input type="comment" id="comment" value={commentInput} onChange={handleCommentInput}/>
            <button onClick={handleCommentPost}>Post</button>
        </div>
    )
}