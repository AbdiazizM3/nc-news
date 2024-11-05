import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, getCommentsByArticle } from "../api";
import Loading from "./Loading";

export default function ArticlePage () {
    const {article_id} = useParams()
    const [article, setArticle] = useState({})
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getArticleById(article_id).then((data) => {
            setArticle(data.article)
            setIsLoading(false)
        })
    }, [comments])

    if(isLoading){
        return <Loading />
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
                <p className="article-details">votes: {article.votes}</p>
                <p className="article-details">comments: {article.comment_count}</p>
                <p className="article-details">{article.created_at}</p>
            </div>
        </article>
    )
}