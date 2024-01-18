import "./App.css";
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/Homepage';
import Login from './components/Login';
import Register from './components/Register';
import NavBar from './components/NavBar';
import DeckBuilder from "./components/DeckBuilder";
import Explore from "./components/Explore";
import AccountInfo from "./components/AccountInfo";
import DeckComments from "./components/DeckComments";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <NavBar isLoggedIn = {isLoggedIn} setIsLoggedIn = {setIsLoggedIn}/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login setIsLoggedIn= {setIsLoggedIn}/>} />
        <Route path="/register" element={<Register setIsLoggedIn= {setIsLoggedIn}/>} />
        <Route path="/account" element={<AccountInfo />} />
        <Route path="/deckbuilder" element={<DeckBuilder />} />
        <Route path="/explore" element={<Explore />} />
				<Route path="/deckcomments" element={<DeckComments />} />
      </Routes>
    </Router> 
  );
}

export default App;
