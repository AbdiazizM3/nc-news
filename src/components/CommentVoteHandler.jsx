import { useContext, useState } from "react"
import { dislikeCommentVotesById, likeCommentVotesById } from "../api"
import { CurrentUserContext } from "../CurrentUser"

export default function CommentVoteHandler({votes, comment_id, date}) {
    const {currentUser} = useContext(CurrentUserContext)
    const [voteCount, setVoteCount] = useState(votes)
    const isLiked = localStorage.getItem(`${currentUser}${comment_id}like`)
    const isDisliked = localStorage.getItem(`${currentUser}${comment_id}dislike`)

    function upVote() {
        setVoteCount((currVotes) => {
            localStorage.setItem(`${currentUser}${comment_id}like`, "liked")
            return currVotes + 1
        })

        likeCommentVotesById(comment_id).then(() => {
            if(isDisliked){
                removeDownVote()
            }
        }).catch((err) => {
            setVoteCount((currVotes) => {
                return currVotes - 1
            })
        })
    }

    function removeUpVote() {
        setVoteCount((currVotes) => {
            localStorage.removeItem(`${currentUser}${comment_id}like`)
            return currVotes - 1
        })

        dislikeCommentVotesById(comment_id).catch((err) => {
            setVoteCount((currVotes) => {
                return currVotes + 1
            })
        })
    }

    function downVote() {
        setVoteCount((currVotes) => {
            localStorage.setItem(`${currentUser}${comment_id}dislike`, "disliked")
            return currVotes - 1
        })

        dislikeCommentVotesById(comment_id).then(() => {
            if(isLiked){
                removeUpVote()
            }
        }).catch((err) => {
            setVoteCount((currVotes) => {
                return currVotes + 1
            })
        })
    }

    function removeDownVote() {
        setVoteCount((currVotes) => {
            localStorage.removeItem(`${currentUser}${comment_id}dislike`)
            return currVotes + 1
        })

        likeCommentVotesById(comment_id).catch((err) => {
            setVoteCount((currVotes) => {
                return currVotes - 1
            })
        })
    }

    return(
        <div className="flex justify-center space-x-8">
            {isLiked === "liked" ? <button className="border-solid border-2 border-slate-900 text-slate-100 bg-red-600 hover:bg-red-300 px-2 rounded" onClick={removeUpVote}>ʌ</button> : <button className="border-solid border-2 border-slate-900 px-2 rounded" onClick={upVote}>ʌ</button>}
            {isDisliked === "disliked" ? <button className="border-solid border-2 border-slate-900 text-slate-100 bg-indigo-600 hover:bg-indigo-300 px-2 rounded" onClick={removeDownVote}>v</button> : <button className="border-solid border-2 border-slate-900 px-2 rounded" onClick={downVote}>v</button>}
            <p>Votes: {voteCount}</p>
            <p>{date}</p>
        </div>
    )
}