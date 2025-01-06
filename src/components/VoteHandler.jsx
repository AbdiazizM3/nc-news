import { useContext, useState } from "react"
import { likeArticleVotesById, dislikeArticleVotesById } from "../api"
import { useParams } from "react-router-dom"
import { CurrentUserContext } from "../CurrentUser"

export default function VoteHandler({votes, comment_count, date}) {
    const {currentUser} = useContext(CurrentUserContext)
    const {article_id} = useParams()
    const [voteCount, setVoteCount] = useState(votes)
    const isLiked = localStorage.getItem(`${currentUser}${article_id}`)

    function upVote() {
        setVoteCount((currVotes) => {
            localStorage.removeItem(`${currentUser}${article_id}`)
            localStorage.setItem(`${currentUser}${article_id}`, "liked")
            return currVotes + 1
        })

        likeArticleVotesById(article_id).catch((err) => {
            setVoteCount((currVotes) => {
                return currVotes - 1
            })
        })
    }

    function downVote() {
        setVoteCount((currVotes) => {
            localStorage.removeItem(`${currentUser}${article_id}`)
            localStorage.setItem(`${currentUser}${article_id}`, "disliked")
            return currVotes - 1
        })

        dislikeArticleVotesById(article_id).catch((err) => {
            setVoteCount((currVotes) => {
                return currVotes + 1
            })
        })
    }

    return(
        <div className="flex justify-center space-x-8">
            {isLiked === "liked" ? <button className="border-solid border-2 border-slate-900 text-slate-100 bg-red-600 hover:bg-red-300 px-2 rounded" onClick={downVote}>v</button> : <button className="border-solid border-2 border-slate-900 px-2 rounded" onClick={upVote}>ʌ</button>}
            <p>Votes: {voteCount}</p>
            <p>comments: {comment_count}</p>
            <p>{date}</p>
        </div>
    )
}