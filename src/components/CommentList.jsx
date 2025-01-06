import { useContext, useEffect, useState } from "react"
import { getCommentsByArticle } from "../api"
import CommentCard from "./CommentCard"
import Loading from "./Loading"
import { CurrentUserContext } from "../CurrentUser"

export default function CommentList ({ article_id }) {
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [deleteStatus, setDeleteStatus] = useState(false)
    const [page, setPage] = useState(1)

    useEffect(() => {
        setIsLoading(true)
        getCommentsByArticle(article_id, page).then((data) => {
            setComments(data.comments)
            setIsLoading(false)
        }).catch((err) => {
            setError("Failed to load comments")
            setIsLoading(false)
        })
    }, [deleteStatus, page])

    function handlePageDown() {
        setPage((currPage) => {
            return currPage -= 1
        })
    }
    function handlePageUp() {
        setPage((currPage) => {
            return currPage += 1
        })
    }

    if(isLoading){
        return <Loading />
    }

    if(comments.length < 1){
        return (
            <div className="space-y-2">
                <h2 className="font-bold">Comments</h2>
                <p>No Comments</p>
                <div className="flex justify-center space-x-2">
                {page === 1 ? <button disabled={true} onClick={handlePageDown}>{"<"}</button> : <button onClick={handlePageDown}>{"<"}</button>}
                <p>{page}</p>
                {comments.length < 10 ? <button disabled={true} onClick={handlePageUp}>{">"}</button> : <button onClick={handlePageUp}>{">"}</button>}
            </div>
            </div>
        )
    }

    return(
        <div>
            <h2 className="font-bold">Comments</h2>
            <ul>
                {comments.map((comment) => {
                    return (
                        <li key={comment.comment_id} className="border-solid border-2 border-indigo-600 py-9 mb-6 mt-2 rounded">
                        <CommentCard comment={comment} setDeleteStatus={setDeleteStatus}/>
                        </li>
                    )
                })}
            </ul>
            <div className="flex justify-center space-x-2">
                {page === 1 ? <button disabled={true} onClick={handlePageDown}>{"<"}</button> : <button onClick={handlePageDown}>{"<"}</button>}
                <p>{page}</p>
                {comments.length < 10 ? <button disabled={true} onClick={handlePageUp}>{">"}</button> : <button onClick={handlePageUp}>{">"}</button>}
            </div>
        </div>
    )
}