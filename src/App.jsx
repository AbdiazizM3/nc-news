import { useState } from 'react'
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

function App() {
  const [currentUser, setCurrentUser] = useState("")

  return (
    <>
      <div>
        <Router>
        <Header setCurrentUser={setCurrentUser}/>
          <Routes>
          <Route path="/" element={<Login setCurrentUser={setCurrentUser}/>} />
          <Route path="/home" element={<Home currentUser={currentUser}/>} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/:topic/articles" element={<Articles />} />
          <Route path="/home/:article_id" element={<ArticlePage currentUser={currentUser}/>} />
          <Route path="/:topic/articles/:article_id" element={<ArticlePage currentUser={currentUser}/>} />
          <Route path='*' exact={true} element={<PageNotFound />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
