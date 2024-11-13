import { useContext } from "react"
import DeleteButton from "./DeleteButton"
import { CurrentUserContext } from "../CurrentUser"

export default function CommentCard({comment, setDeleteStatus}) {
    const {currentUser} = useContext(CurrentUserContext)

    return(<div className="comment__list">
            <h3>{comment.author}</h3>
            <p>{comment.body}</p>
            <p className="comment__list --details">votes: {comment.votes}</p>
            <p className="comment__list --details">{comment.created_at}</p>
            <DeleteButton id={comment.comment_id} author={comment.author} username={currentUser} setDeleteStatus={setDeleteStatus}/>
            </div>
    )
}