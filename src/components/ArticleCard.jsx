import { Link } from "react-router-dom"

export default function ArticleCard({article}) {
    const isoDate = new Date(article.created_at)

    const readableDate = isoDate.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    })
    return(
    <Link to={`${article.article_id}`}>
        <div className="justify-center">
            <h2 className="font-bold mb-2">{article.title}</h2>
            <p>Topic: {article.topic}</p>
            <p className="text-right">{article.author}</p>
            <div className="flex justify-center space-x-12">
                <p>Votes: {article.votes}</p>
                <p>Comments: {article.comment_count}</p>
                <p>{readableDate}</p>
            </div>
        </div>
    </Link>
    )
}