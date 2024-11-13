import { useState } from "react"
import { likeArticleVotesById, dislikeArticleVotesById } from "../api"
import { useParams } from "react-router-dom"

export default function VoteHandler({votes, comment_count, date}) {
    const {article_id} = useParams()
    const [voteCount, setVoteCount] = useState(votes)
    const [isVote, setIsVote] = useState(false)

    function upVote() {
        setIsVote(true)
        setVoteCount((currVotes) => {
            return currVotes + 1
        })

        likeArticleVotesById(article_id).catch((err) => {
            setVoteCount((currVotes) => {
                return currVotes - 1
            })
        })
    }

    function downVote() {
        setIsVote(false)
        setVoteCount((currVotes) => {
            return currVotes - 1
        })

        dislikeArticleVotesById(article_id).catch((err) => {
            setVoteCount((currVotes) => {
                return currVotes + 1
            })
        })
    }

    if(isVote){
        return(
            <div className="article__data">
                <button className="article__details --votes" onClick={downVote}>👎</button>
                <p className="article__details --votes">Votes: {voteCount}</p>
                <p className="article__details">comments: {comment_count}</p>
                <p className="article__details">{date}</p>
            </div>
        )
    }

    return(
        <div className="article__data">
            <button className="article__details --votes" onClick={upVote}>👍</button>
            <p className="article__details --votes">Votes: {voteCount}</p>
            <p className="article__details">comments: {comment_count}</p>
            <p className="article__details">{date}</p>
        </div>
    )
}