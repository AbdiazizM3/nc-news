import { useContext, useState } from "react"
import { postCommentById } from "../api"
import Error from "./Error"
import { CurrentUserContext } from "../CurrentUser"

export default function PostComment({id}) {
    const {currentUser} = useContext(CurrentUserContext)
    const [commentInput, setCommentInput] = useState([])
    const [error, setError] = useState(null)

    async function handleCommentInput(event) {
        await setCommentInput(event.target.value)
    }

    async function handleCommentPost(event) {
        await postCommentById(id, currentUser, commentInput).catch((err) => {
            setError("Failed to post comment")
        })
        await setCommentInput("")
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