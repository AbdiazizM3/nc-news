import { useContext } from "react"
import DeleteCommentBtn from "./DeleteCommentBtn"
import { CurrentUserContext } from "../CurrentUser"
import CommentVoteHandler from "./CommentVoteHandler"

export default function CommentCard({comment, setDeleteStatus}) {
    const {currentUser} = useContext(CurrentUserContext)

    const isoDate = new Date(comment.created_at)

    const readableDate = isoDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    })

    return(<div className="justify-center space-y-2 space-x-2">
                <h2 className="font-bold">{comment.author}</h2>
                <p>{comment.body}</p>
                <div className="flex">
                    <CommentVoteHandler comment_id={comment.comment_id} votes={comment.votes} date={readableDate}/>
                </div>
                <DeleteCommentBtn id={comment.comment_id} author={comment.author} username={currentUser} setDeleteStatus={setDeleteStatus}/>
            </div>
    )
}