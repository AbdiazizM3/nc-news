import ArticleCard from "./ArticleCard"

export default function ArticleList ({articles}) {
    return(
    <div className="flex flex-col items-center">
        <ul>
            {articles.map((article) => {
                return(
                    <li key={article.article_id} className="border-4 border-solid border-indigo-600 py-9 mb-6 rounded">
                        <ArticleCard article={article}/>
                    </li>
                )
            })}
        </ul>
    </div>
    )
}