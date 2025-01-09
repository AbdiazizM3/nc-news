import { useContext, useEffect, useState } from "react"
import Error from "./Error"
import { getArticleByTopic, getUserByUsername } from "../api"
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
    const [page, setPage] = useState(1)
    const [userDetails, setUserDetails] = useState(null)
    const name = localStorage.getItem("userDetails")

    useEffect(() => {
        setIsLoading(true)
        getUserByUsername(name).then(({user}) => {
            setUserDetails(user)
        })
        getArticleByTopic("", sort, order, page).then(({articles}) => {
            setArticles(articles)
            setIsLoading(false)
        }).catch((err) => {
            setError("Could not find any articles")
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
       return <Error message={error}/>
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center space-y-4 w-full max-w-3xl px-4 py-6 bg-white shadow-lg rounded-lg">
                <div className="flex items-center space-x-2">
                    <img src={userDetails.avatar_url} alt={`User avatar for ${userDetails.name}`} className="object-cover w-20 h-20 rounded-full border-solid border-2 border-slate-900" />
                    <h2 className="font-bold">Welcome back {userDetails.name}</h2>
                </div>
                <h3>Here is a list of all articles: </h3>
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