import { Routes, Route } from 'react-router-dom';
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/Homepage';
import Login from './components/Login';
import Register from './components/Register';
import NavBar from './components/NavBar';

function App() {

  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router> 
  );
}

export default App;
