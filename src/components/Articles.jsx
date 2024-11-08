import { useEffect, useState } from "react";
import { getArticleByTopic } from "../api";
import Loading from "./Loading";
import ArticleCard from "./ArticleCard";
import { useParams } from "react-router-dom";
import SortDrop from "./SortDrop";

export default function Articles () {
    const {topic} = useParams()
    const [articles, setArticles] = useState([])
    const [sort, setSort] = useState("created_at")
    const [order, setOrder] = useState("DESC")
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        getArticleByTopic(topic, sort, order).then(({articles}) => {
            setArticles(articles)
            setIsLoading(false)
        }).catch((err) => {
            setError(`Could not find any articles under the ${topic} topic.`)
            setIsLoading(false)
        })
    }, [articles, sort, order])

    if(isLoading){
        return <Loading />
    }

    if(error){
        return <Error message={error}/>
    }

    return (
        <article>
            <SortDrop setSort={setSort} setOrder={setOrder} />
            <ArticleCard articles={articles} />
        </article>
    )
}