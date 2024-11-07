import { useState } from "react"
import { updateArticleVotesById } from "../api"
import { useParams } from "react-router-dom"

export default function VoteHandler({votes, comment_count, date}) {
    const {article_id} = useParams()
    const [voteCount, setVoteCount] = useState(votes)

    function upVote() {
        setVoteCount((currVotes) => {
            return currVotes + 1
        })

        updateArticleVotesById(article_id).catch((err) => {
            setVoteCount((currVotes) => {
                return currVotes - 1
            })
        })
    }

    return(
        <div>
            <button className="article-details votes" onClick={upVote}>Votes:</button>
            <p className="article-details votes">{voteCount}</p>
            <p className="article-details">comments: {comment_count}</p>
            <p className="article-details">{date}</p>
        </div>
    )
}