import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/authContext';
import './App.css';


import Login from './components/Login';
import HomePage from './components/HomePage';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './components/Profile';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
           {/* Rutas Públicas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Rutas Protegidas */}
          <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
