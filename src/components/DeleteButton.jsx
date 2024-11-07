import { deleteCommentById } from "../api"

export default function DeleteButton({id, author, username}) {
    function handleDelete(event) {
        deleteCommentById(event.currentTarget.value)
    }

    if(author === username){
    return <button className="comment-details" onClick={handleDelete} value={id}>X</button>
    }
}