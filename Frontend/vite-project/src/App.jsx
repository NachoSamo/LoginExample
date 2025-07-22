import { useState } from 'react'
import './App.css'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { Routes } from 'react-router-dom'


import Login from './components/Login'
import HomePage from './components/HomePage'
import Register from './components/register'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </Router>
  )
}

export default App
