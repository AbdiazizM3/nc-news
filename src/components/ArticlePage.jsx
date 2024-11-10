import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, getCommentsByArticle} from "../api";
import Loading from "./Loading";
import CommentList from "./CommentList"
import VoteHandler from "./VoteHandler";
import PostComment from "./PostComment";
import Error from "./Error"

export default function ArticlePage ({currentUser}) {
    const {article_id} = useParams()
    const [article, setArticle] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setIsLoading(true)
        getArticleById(article_id).then((data) => {
            setArticle(data.article)
            setIsLoading(false)
        }).catch((err) => {
            setError("Failed to load article")
            setIsLoading(false)
        })
    }, [])

    if(isLoading){
        return <Loading />
    }

    if(error){
        return <Error message={error}/>
    }

    return(
        <article>
            <div>
                <h2>{article.author}</h2>
                <h2>{article.title}</h2>
                <h3>Topic: {article.topic}</h3>
                <p>{article.body}</p>
                <img src={article.article_img_url} alt="Picture of related article" id="article__img"/>
                <br />
                <VoteHandler votes={article.votes} comment_count={article.comment_count} date={article.created_at}/>
            </div>
            <PostComment id={article_id} currentUser={currentUser}/>
            <CommentList article_id={article_id} currentUser={currentUser}/>
        </article>
    )
}