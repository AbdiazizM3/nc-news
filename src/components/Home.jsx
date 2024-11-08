import { useEffect, useState } from "react"
import Error from "./Error"
import { getArticleByTopic } from "../api"
import Loading from "./Loading"
import ArticleCard from "./ArticleCard";
import SortDrop from "./SortDrop";

export default function Home ({currentUser}) {
    const [articles, setArticles] = useState([])
    const [sort, setSort] = useState("created_at")
    const [order, setOrder] = useState("DESC")
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        getArticleByTopic("", sort, order).then(({articles}) => {
            setArticles(articles)
            setIsLoading(false)
        }).catch((err) => {
            setError("Could not find any articles")
        })
    }, [sort, order])

    if(isLoading){
        return <Loading />
    }

    if(error){
       return <Error message={error}/>
    }

    return (
        <article>
            <div>
                <h2>Welcome back {currentUser}</h2>
                <h3>Here is a list of all articles: </h3>
                <SortDrop setSort={setSort} setOrder={setOrder}/>
                <ArticleCard articles={articles}/>
            </div>
        </article>
    )
}