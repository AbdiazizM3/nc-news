import DeleteButton from "./DeleteButton"

export default function CommentCard ({comments, currentUser}) {
    return(
        <div>
            <h2>Comments</h2>
            <ul>
                {comments.map((comment) => {
                    return(
                        <li key={comment.comment_id} className="comment-box">
                            <h3>{comment.author}</h3>
                            <p>{comment.body}</p>
                            <p className="comment-details">votes: {comment.votes}</p>
                            <p className="comment-details">{comment.created_at}</p>
                            <DeleteButton id={comment.comment_id} author={comment.author} username={currentUser}/>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}