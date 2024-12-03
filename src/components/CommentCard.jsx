import { useContext } from "react"
import DeleteButton from "./DeleteButton"
import { CurrentUserContext } from "../CurrentUser"

export default function CommentCard({comment, setDeleteStatus}) {
    const {currentUser} = useContext(CurrentUserContext)

    const isoDate = new Date(comment.created_at)

    const readableDate = isoDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    })

    return(<div className="comment__list">
            <h3>{comment.author}</h3>
            <p>{comment.body}</p>
            <p className="comment__list --details">votes: {comment.votes}</p>
            <p className="comment__list --details">{readableDate}</p>
            <DeleteButton id={comment.comment_id} author={comment.author} username={currentUser} setDeleteStatus={setDeleteStatus}/>
            </div>
    )
}