import "./App.css";
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/Homepage';
import Login from './components/Login';
import Register from './components/Register';
import NavBar from './components/NavBar';
import Cards from "./components/Cards";
import DeckBuilder from "./components/DeckBuilder";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <NavBar isLoggedIn = {isLoggedIn} setIsLoggedIn = {setIsLoggedIn}/>
      <Routes>
        <Route path="/login" element={<Login setIsLoggedIn= {setIsLoggedIn}/>} />
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register setIsLoggedIn= {setIsLoggedIn}/>} />
        <Route path="/deckbuilder" element={<DeckBuilder />} />
      </Routes>
    </Router> 
  );
}

export default App;
