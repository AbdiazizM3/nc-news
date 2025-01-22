import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteArticleById, getArticleById} from "../api";
import Loading from "./Loading";
import CommentList from "./CommentList"
import VoteHandler from "./VoteHandler";
import PostComment from "./PostComment";
import Error from "./Error"

export default function ArticlePage () {
    const navigate = useNavigate()
    const {article_id} = useParams()
    const [article, setArticle] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [deleteStatus, setDeleteStatus] = useState(false)
    const [commentStatus, setCommentStatus] = useState(false)
    const [error, setError] = useState(null)
    const username = localStorage.getItem("userDetails")

    useEffect(() => {
        setIsLoading(true)
        setError(null)

        const fetchData = async () => {
            try{
                const articleResponse = await getArticleById(article_id)
                setArticle(articleResponse.article)
            }catch (err) {
                setError(err.message || "Could not fetch data. Please try again later.")
            }finally{
                setIsLoading(false)
            }
        }

        fetchData();
    }, [commentStatus, deleteStatus])

    function handleDeleteArticle(){
        deleteArticleById(article.article_id).then(() => {
            navigate(-1)
        })
    }

    if(isLoading){
        return <Loading />
    }

    if(error){
        return <Error message={error}/>
    }

    const isoDate = new Date(article.created_at)

    const readableDate = isoDate.toLocaleDateString('en-GB', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    })

    return(
        <article className="flex flex-col justify-center items-center space-y-4 w-full max-w-6xl px-4 py-6">
            {username === article.author && <button className="fixed right-2 top-24 border-solid border-2 border-rose-600 bg-rose-600 hover:bg-rose-300 text-slate-100 px-2 py-1 rounded-lg" onClick={handleDeleteArticle}>Delete</button>}
            <div className="flex flex-col justify-center items-center">
                <h2 className="mb-2 font-bold">{article.author}</h2>
                <h2 className="mb-2">{article.title}</h2>
                <h3 className="mb-2">Topic: {article.topic}</h3>
                <p className="mb-2">{article.body}</p>
                <img src={article.article_img_url} alt="Picture of related article" className="mb-2"/>
                <br />
                <VoteHandler votes={article.votes} comment_count={article.comment_count} date={readableDate}/>
            </div>
            <PostComment id={article_id} setCommentStatus={setCommentStatus}/>
            <CommentList article_id={article_id} setDeleteStatus={setDeleteStatus}/>
        </article>
    )
}