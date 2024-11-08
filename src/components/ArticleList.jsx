import ArticleCard from "./ArticleCard"

export default function ArticleList ({articles}) {
    return(
    <div className="article__list">
        <ul>
            {articles.map((article) => {
                return(
                    <li key={article.article_id} className="article-box">
                        <ArticleCard article={article}/>
                    </li>
                )
            })}
        </ul>
    </div>
    )
}