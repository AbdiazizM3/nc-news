import { useEffect, useState } from "react";
import { getArticleByTopic } from "../api";
import Loading from "./Loading";
import ArticleList from "./ArticleList";
import { useParams } from "react-router-dom";
import SortDrop from "./SortDrop";

export default function Articles () {
    const {topic} = useParams()
    const [articles, setArticles] = useState([])
    const [sort, setSort] = useState("created_at")
    const [order, setOrder] = useState("DESC")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [page, setPage] = useState(1)

    useEffect(() => {
        setIsLoading(true)
        getArticleByTopic(topic, sort, order, page).then(({articles}) => {
            if(articles.length === 0){
                return Promise.reject([])
            }
            else{
                setArticles(articles)
                setIsLoading(false)
            }
        }).catch((err) => {
            setError("Could not find any articles under the specified topic.")
            setIsLoading(false)
        })
    }, [sort, order, page])

    function handlePageDown() {
        setPage((currPage) => {
            return currPage -= 1
        })
    }
    function handlePageUp() {
        setPage((currPage) => {
            return currPage += 1
        })
    }

    if(isLoading){
        return <Loading />
    }

    if(error){
        return <div>
            <h2>404 - Error</h2>
            <p>{error}</p>
        </div>
    }

    if(articles.length < 1){
        return (
            <div>
                <SortDrop sort={sort} order={order} setSort={setSort} setOrder={setOrder} />
                <p>No Articles</p>
                <div className="flex space-x-2">
                    {page === 1 ? <button disabled={true} onClick={handlePageDown}>{"<"}</button> : <button onClick={handlePageDown}>{"<"}</button>}
                    <p>{page}</p>
                    {articles.length < 10 ? <button disabled={true} onClick={handlePageUp}>{">"}</button> : <button onClick={handlePageUp}>{">"}</button>}
                </div>
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center space-y-4 w-full max-w-3xl px-4 py-6 bg-white shadow-lg rounded-lg">
                    <SortDrop sort={sort} order={order} setSort={setSort} setOrder={setOrder} />
                    <ArticleList articles={articles} />
                    <div className="flex space-x-2">
                        {page === 1 ? <button disabled={true} onClick={handlePageDown}>{"<"}</button> : <button onClick={handlePageDown}>{"<"}</button>}
                        <p>{page}</p>
                        {articles.length < 10 ? <button disabled={true} onClick={handlePageUp}>{">"}</button> : <button onClick={handlePageUp}>{">"}</button>}
                    </div>
            </div>
        </div>
    )
}