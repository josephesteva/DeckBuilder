import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import NavBar from './components/NavBar';
import Cards from "./components/cards";


function App() {
  

  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<>This is the Landing page</>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cards" element={<Cards />} />
      </Routes>
    </Router>
      
  );
}

export default App;
