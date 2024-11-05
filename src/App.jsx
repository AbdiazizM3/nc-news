import { useState } from 'react'
import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from './components/Header'
import Login from './components/Login'
import Topics from './components/Topics'
import Articles from './components/Articles'
import './App.css'
import ArticlePage from './components/ArticlePage'

function App() {
  const [currentUser, setCurrentUser] = useState("")

  return (
    <>
      <div>
        <Router>
        <Header setCurrentUser={setCurrentUser}/>
          <Routes>
          <Route path="/" element={<Login setCurrentUser={setCurrentUser}/>} />
          <Route path="/:username/topics" element={<Topics currentUser={currentUser} setCurrentUser={setCurrentUser}/>} />
          <Route path="/:username/:topic/articles" element={<Articles />} />
          <Route path="/:username/:topic/articles/:article_id" element={<ArticlePage currentUser={currentUser}/>} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
