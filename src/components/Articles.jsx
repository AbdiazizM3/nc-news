import { useEffect, useState } from "react";
import { getArticleByTopic } from "../api";
import Loading from "./Loading";
import ArticleCard from "./ArticleCard";
import { useParams } from "react-router-dom";

export default function Articles () {
    const {topic} = useParams()
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        getArticleByTopic(topic).then(({articles}) => {
            setArticles(articles)
            setIsLoading(false)
        }).catch((err) => {
            setError(`Could not find any articles under the ${topic} topic.`)
            setIsLoading(false)
        })
    }, [articles])

    if(isLoading){
        return <Loading />
    }

    if(error){
        return <Error message={error}/>
    }

    return (
        <article>
            <ArticleCard articles={articles} />
        </article>
    )
}