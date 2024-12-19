import { deleteCommentById } from "../api"

export default function DeleteButton({id, author, username, setDeleteStatus}) {
    function handleDelete(event) {
        deleteCommentById(event.currentTarget.value)
        setDeleteStatus((currStatus) => {
            return !currStatus
        })
    }

    if(author === username){
    return <button className="border-solid border-2 border-rose-600 bg-rose-600 hover:bg-rose-300 text-slate-100 px-2 py-1 rounded-lg" onClick={handleDelete} value={id}>Delete</button>
    }
}