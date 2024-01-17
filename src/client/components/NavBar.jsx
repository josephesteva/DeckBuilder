import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = ({isLoggedIn,setIsLoggedIn}) => {
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
    const handleCardClick = () => {
        navigate("/deckbuilder");
    }
    const handleAccountClick = () => {
        navigate("/account");
    }

    const handleExploreClick = () => {
        navigate("/explore");
    }

    const handleDeckClick = () => {
        navigate("/deckbuilder");
    }
    const handleLogoutClick = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate("/");
    }


    return (
        <nav className='navbar'>
            <button onClick={handleHomeClick}>Home</button>
            {isLoggedIn ? (
                    <>
                        <button onClick={handleLogoutClick}>Logout</button>
                        <button onClick={handleAccountClick}>Account Page</button>
                    </>
                ) : (
                    <>
                        <button onClick={handleLoginClick}>Login</button>
                        <button onClick={handleRegisterClick}>Register</button>
                    </>
                )}

            <button onClick={handleDeckClick}>Deck Viewer</button>
            <button onClick={handleExploreClick}>Explore</button>
        </nav>
    )
}

export default NavBar;