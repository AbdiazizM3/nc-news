import { useContext, useEffect, useState } from "react"
import Error from "./Error"
import { getArticleByTopic } from "../api"
import Loading from "./Loading"
import ArticleList from "./ArticleList";
import SortDrop from "./SortDrop";
import { CurrentUserContext } from "../CurrentUser";

export default function Home () {
    const {currentUser} = useContext(CurrentUserContext)
    const [articles, setArticles] = useState([])
    const [sort, setSort] = useState("created_at")
    const [order, setOrder] = useState("DESC")
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setIsLoading(true)
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
        <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4 w-full max-w-3xl px-4 py-6 bg-white shadow-lg rounded-lg">
        <h2 className="font-bold">Welcome back {currentUser}</h2>
        <h3>Here is a list of all articles: </h3>
                <SortDrop sort={sort} order={order} setSort={setSort} setOrder={setOrder} />
                <ArticleList articles={articles} />
        </div>
    </div>
    )
}