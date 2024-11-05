import { useEffect, useState } from "react";
import { getArticleByTopic } from "../api";
import { useParams } from "react-router-dom";

export default function Articles ({currentUser}) {
    const {topic} = useParams()
    const [articles, setArticles] = useState([])

    useEffect(() => {
        getArticleByTopic(topic).then(({articles}) => {
            setArticles(articles)
        })
    }, [articles])

    return (
        <article>
            <div>
                <ul>
                    {articles.map((article) => {
                        return(
                            <li key={article.article_id} className="article-box">
                                <h2>{article.author}</h2>
                                <h3>{article.title}</h3>
                                <h4>{article.created_at}</h4>
                                <p>votes: {article.votes}</p>
                                <p>comments: {article.comment_count}</p>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </article>
    )
}