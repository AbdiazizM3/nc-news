import { useEffect, useState } from "react";
import { getArticleByTopic } from "../api";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import ArticleCard from "./ArticleCard";

export default function Articles ({currentUser}) {
    const {topic} = useParams()
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getArticleByTopic(topic).then(({articles}) => {
            setArticles(articles)
            setIsLoading(false)
        })
    }, [articles])

    if(isLoading){
        return <Loading />
    }

    return (
        <article>
            <ArticleCard topic={topic} currentUser={currentUser} articles={articles} />
        </article>
    )
}