import DeleteButton from "./DeleteButton"

export default function CommentCard({comment, currentUser}) {
    return(<div className="comment__list">
            <h3>{comment.author}</h3>
            <p>{comment.body}</p>
            <p className="comment__list --details">votes: {comment.votes}</p>
            <p className="comment__list --details">{comment.created_at}</p>
            <DeleteButton id={comment.comment_id} author={comment.author} username={currentUser}/>
            </div>
    )
}