import "./App.css";
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import NavBar from './components/NavBar';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  return (
    <Router>
      <NavBar isLoggedIn = {isLoggedIn} setIsLoggedIn = {setIsLoggedIn}/>
      <Routes>
        <Route path="/" element={<>This is the Landing page</>} />
        <Route path="/login" element={<Login setIsLoggedIn= {setIsLoggedIn}/>} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
      
  );
}

export default App;
