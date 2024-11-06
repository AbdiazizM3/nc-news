import { useEffect, useState } from "react";
import { getArticleByTopic } from "../api";
import Loading from "./Loading";
import ArticleCard from "./ArticleCard";
import Topics from "./Topics";

export default function Articles () {
    const [topic, setTopic] = useState("")
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
            <Topics setTopic={setTopic}/>
            <ArticleCard articles={articles} />
        </article>
    )
}