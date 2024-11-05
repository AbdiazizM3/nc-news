import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ArticlePage () {
    const param = useParams()
    console.log(param)
    const [article, setArticle] = useState([])
    const [comments, setComments] = useState([])

    useEffect(() => {

    }, [])
}