import React from "react";
import { useNavigate } from "react-router-dom";
import AudioPlayer from "./AudioPlayer";
import "../styles/NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const handleSplashClick = () => {
    navigate("/");
  };
  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleRegisterClick = () => {
    navigate("/register");
  };
  const handleAccountClick = () => {
    navigate("/account");
  };

  const handleExploreClick = () => {
    navigate("/explore");
  };

  const handleAdminClick = () => {
    navigate("/admin");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  const handleDeckBuilderClick = () => {
    navigate("/deckbuilder");
  };

  if (localStorage.getItem("isTemp") !== "true") {
    return (
      <>
        <div className="nav-holder">
          <AudioPlayer />
          <nav className="navbar">
            <button onClick={handleSplashClick}>Splash</button>
            <button onClick={handleExploreClick}>Explore Decks</button>
            {localStorage.getItem("token") ? (
              <>
                <button onClick={handleDeckBuilderClick}>Deck Builder</button>
                <button onClick={handleAccountClick}>Account Page</button>
                {localStorage.getItem("isAdmin") === "true" && <button onClick={handleAdminClick}>Admin</button>}
                <button onClick={handleLogoutClick}>Logout</button>
              </>
            ) : (
              <>
                <button onClick={handleLoginClick}>Login</button>
                <button onClick={handleRegisterClick}>Register</button>
              </>
            )}
          </nav>
        </div>
        <div className="spacer"></div>
      </>
    );
  }
  return null;
};

export default NavBar;
