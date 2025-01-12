import { useContext, useEffect, useState } from "react"
import Error from "./Error"
import { getArticleByTopic, getUserByUsername } from "../api"
import Loading from "./Loading"
import ArticleList from "./ArticleList";
import SortDrop from "./SortDrop";
import { CurrentUserContext } from "../CurrentUser";
import { useNavigate } from "react-router-dom";

export default function Home () {
    const {currentUser} = useContext(CurrentUserContext)
    const navigate = useNavigate()
    const [articles, setArticles] = useState([])
    const [sort, setSort] = useState("created_at")
    const [order, setOrder] = useState("DESC")
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [page, setPage] = useState(1)
    const [userDetails, setUserDetails] = useState(null)
    const name = localStorage.getItem("userDetails")

    useEffect(() => {
        setIsLoading(true);
        setError(null);
    
        const fetchData = async () => {
            try {
                const userResponse = await getUserByUsername(name);
                setUserDetails(userResponse.user);
    
                const articleResponse = await getArticleByTopic("", sort, order, page);
                setArticles(articleResponse.articles);
            } catch (err) {
                setError(err.message || "Could not fetch data. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchData();
    }, [sort, order, page, name]);

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

    function navigateToPage() {
        console.log("moving to /upload")
        navigate("/upload")
    }

    if(isLoading){
        return <Loading />
    }

    if(error){
       return <Error message={error}/>
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center space-y-4 w-full max-w-3xl px-4 py-6 shadow-lg rounded-lg">
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
            <button className="fixed bottom-4 right-4 border-solid border-2 border-slate-600 bg-indigo-600 hover:bg-indigo-300 text-slate-100 font-bold px-8 py-4 rounded-full shadow-lg" onClick={navigateToPage}>+</button>
        </div>
    )
}