import { useContext, useEffect, useState } from "react"
import { getCommentsByArticle } from "../api"
import CommentCard from "./CommentCard"
import Loading from "./Loading"
import { CurrentUserContext } from "../CurrentUser"

export default function CommentList ({article_id }) {
    const {currentUser} = useContext(CurrentUserContext)
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        getCommentsByArticle(article_id).then((data) => {
            setComments(data.comments)
            setIsLoading(false)
        }).catch((err) => {
            setError("Failed to load comments")
            setIsLoading(false)
        })
    }, [])

    if(isLoading){
        return <Loading />
    }

    return(
        <div className="comment__list">
            <h2>Comments</h2>
            <ul>
                {comments.map((comment) => {
                    return (
                        <li key={comment.comment_id} className="comment__box">
                        <CommentCard comment={comment} currentUser={currentUser}/>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}