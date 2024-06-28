import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SplashPage from "./Pages/SplashPage";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import NavBar from "./components/NavBar";
import DeckBuilder from "./Pages/DeckBuilder";
import Explore from "./Pages/Explore";
import AccountInfo from "./Pages/AccountInfo";
import Profile from "./Pages/Profile";
import DeckComments from "./components/DeckComments";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SingleDeck from "./Pages/SingleDeck";
import AdminPage from "./Pages/AdminPage";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <NavBar />
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<AccountInfo />} />
        <Route path="/account/:id" element={<Profile />} />
        <Route path="/deckbuilder" element={<DeckBuilder />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/deckcomments" element={<DeckComments />} />
        <Route path="/deck/:id" element={<SingleDeck />} />
        <Route path="admin" element={<AdminPage />} />
      </Routes>
      <ToastContainer autoClose={1000} />
    </Router>
  );
}

export default App;
