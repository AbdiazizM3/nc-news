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

    return(<div className="justify-center">
                <h2 className="font-bold">{comment.author}</h2>
                <p>{comment.body}</p>
                <div className="flex flex-row space-x-12">
                    <p>votes: {comment.votes}</p>
                    <p>{readableDate}</p>
                </div>
                <DeleteButton id={comment.comment_id} author={comment.author} username={currentUser} setDeleteStatus={setDeleteStatus}/>
            </div>
    )
}