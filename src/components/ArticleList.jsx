import ArticleCard from "./ArticleCard"

export default function ArticleList ({articles}) {
    const breakException = {}
    return(
    <div className="flex flex-col items-center">
        <ul>
            {articles.map((article) => {
                if(article.total_count){
                    return ""
                }
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