import { Link } from "react-router-dom"

export default function ArticleCard ({articles}) {
    return(
    <div>
        <ul>
            {articles.map((article) => {
                return(
                <li key={article.article_id} className="article-box">
                    <Link to={`${article.article_id}`}>
                    <h2>{article.author}</h2>
                    <h3>{article.title}</h3>
                    <h4>{article.created_at}</h4>
                    <p>Topic: {article.topic}</p>
                    <p>Votes: {article.votes}</p>
                    <p>Comments: {article.comment_count}</p>
                    </Link>
                </li>
                )
            })}
        </ul>
    </div>
    )
}