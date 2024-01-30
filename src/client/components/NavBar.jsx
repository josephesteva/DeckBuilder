import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate("/");
  }
  const handleLoginClick = () => {
    navigate("/login");
  }
  const handleRegisterClick = () => {
    navigate("/register");
  }
  const handleAccountClick = () => {
    navigate("/account");
  }

  const handleExploreClick = () => {
    navigate("/explore");
  }

  const handleLogoutClick = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('isAdmin');
    setIsLoggedIn(false);
    navigate("/");
  }

  const handleDeckBuilderClick = () => {
    navigate("/deckbuilder");
  }


    return (
        <nav className='navbar'>
            <button onClick={handleHomeClick}>Home</button>
            {localStorage.getItem('token') ? (
                    <>
                        <button onClick={handleLogoutClick}>Logout</button>
                        <button onClick={handleDeckBuilderClick}>Deck Builder</button>
                        <button onClick={handleAccountClick}>Account Page</button>
                    </>
                ) : (
                    <>
                        <button onClick={handleLoginClick}>Login</button>
                        <button onClick={handleRegisterClick}>Register</button>
                    </>
                )}

      <button onClick={handleExploreClick}>Explore</button>
    </nav>
  )
}

export default NavBar;