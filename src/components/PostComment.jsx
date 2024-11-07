import { useState } from "react"
import { postCommentById } from "../api"
import Error from "./Error"

export default function PostComment({id, currentUser}) {
    const [commentInput, setCommentInput] = useState([])
    const [error, setError] = useState(null)

    async function handleCommentInput(event) {
        await setCommentInput(event.target.value)
    }

    async function handleCommentPost(event) {
        await postCommentById(id, currentUser, commentInput).catch((err) => {
            setError(err)
        })
        await setCommentInput("")
    }

    if(error){
        return <Error message={error.message}/>
    }

    return(
        <div>
            <label htmlFor="comment">Comment: </label>
            <input type="comment" id="comment" value={commentInput} onChange={handleCommentInput}/>
            <button onClick={handleCommentPost}>Post</button>
        </div>
    )
}