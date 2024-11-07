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

function App() {
  const [currentUser, setCurrentUser] = useState("")

  return (
    <>
      <div>
        <Router>
        <Header currentUser={currentUser} setCurrentUser={setCurrentUser}/>
          <Routes>
          <Route path="/" element={<Login setCurrentUser={setCurrentUser}/>} />
          <Route path="/:username/home" element={<Home currentUser={currentUser}/>} />
          <Route path="/:username/topics" element={<Topics currentUser={currentUser}/>}/>
          <Route path="/:username/:topic/articles" element={<Articles />} />
          <Route path="/:username/:topic/articles/:article_id" element={<ArticlePage currentUser={currentUser}/>} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
