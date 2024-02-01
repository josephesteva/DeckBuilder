import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
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

  const handleAdminClick = () => {
    navigate("/admin");
  }

  const handleLogoutClick = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('isAdmin');
    navigate("/");
  }

  const handleDeckBuilderClick = () => {
    navigate("/deckbuilder");
  }


<<<<<<< HEAD
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

=======
  return (
    <nav className='navbar'>
      <button onClick={handleHomeClick}>Home</button>
      {localStorage.getItem('token') ? (
        <>
          <button onClick={handleLogoutClick}>Logout</button>
          <button onClick={handleDeckBuilderClick}>Deck Builder</button>
          <button onClick={handleAccountClick}>Account Page</button>
          {localStorage.getItem('isAdmin') === 'true' && <button onClick={handleAdminClick}>Admin</button>}
        </>
      ) : (
        <>
          <button onClick={handleLoginClick}>Login</button>
          <button onClick={handleRegisterClick}>Register</button>
        </>
      )}
  
>>>>>>> 598a437339b2cb6d27b6147492653b84531b76bd
      <button onClick={handleExploreClick}>Explore</button>
    </nav>
  )
}

export default NavBar;