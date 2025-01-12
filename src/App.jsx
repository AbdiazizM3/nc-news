import { useContext, useEffect, useState } from 'react'
import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from './components/Header'
import Login from './components/Login'
import Home from './components/Home'
import Articles from './components/Articles'
import ArticlePage from './components/ArticlePage'
import Topics from './components/Topics'
import './App.css'
import PageNotFound from './components/PageNotFound'
import { CurrentUserContext } from './CurrentUser'
import CreateArticle from './components/CreateArticle'

function App() {
  const {setCurrentUser} = useContext(CurrentUserContext)

  useEffect(() => {
    const user = localStorage.getItem("userDetails")
    setCurrentUser(user)
  }, [])

  return (
    <>
      <div>
        <Router>
        <Header />
          <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/:topic/articles" element={<Articles />} />
          <Route path="/home/:article_id" element={<ArticlePage />} />
          <Route path="/:topic/articles/:article_id" element={<ArticlePage />} />
          <Route path="/upload" element={<CreateArticle />} />
          <Route path='*' exact={true} element={<PageNotFound />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
