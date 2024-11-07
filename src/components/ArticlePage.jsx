import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, getCommentsByArticle} from "../api";
import Loading from "./Loading";
import CommentCard from "./CommentCard"
import VoteHandler from "./VoteHandler";

export default function ArticlePage () {
    const {article_id} = useParams()
    const [article, setArticle] = useState({})
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        getArticleById(article_id).then((data) => {
            setArticle(data.article)
        }).catch((err) => {
            setError(err)
        })
        getCommentsByArticle(article_id).then((data) => {
            setComments(data.comments)
            setIsLoading(false)
        }).catch((err) => {
            setError(err)
        })
    }, [])

    if(isLoading){
        return <Loading />
    }

    if(error){
        return <Error message={error.message}/>
    }

    return(
        <article>
            <div>
                <h2>{article.author}</h2>
                <h2>{article.title}</h2>
                <h3>Topic: {article.topic}</h3>
                <p>{article.body}</p>
                <img src={article.article_img_url} alt="Picture of related article" />
                <br />
                <VoteHandler votes={article.votes} comment_count={article.comment_count} date={article.created_at}/>
            </div>
            <CommentCard comments={comments}/>
        </article>
    )
}