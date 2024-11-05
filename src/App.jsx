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
  return (
    <>
      <div>
        <Router>
        <Header />
          <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/:username/topics" element={<Topics />} />
          <Route path="/:username/:topic/articles" element={<Articles />} />
          <Route path="/:username/:topic/articles/:article_id" element={<ArticlePage />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
