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
        navigate("/cards");
    }
    const handleLogoutClick = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate("/");
    }


    return (
        <nav>
            <button onClick={handleHomeClick}>Home</button>
            {isLoggedIn ? (
                    <>
                        <button onClick={handleLogoutClick}>Logout</button>
                        <button>Account Page</button>
                    </>
                ) : (
                    <>
                        <button onClick={handleLoginClick}>Login</button>
                        <button onClick={handleRegisterClick}>Register</button>
                    </>
                )}

            <button>Deck Viewer</button>
            <button onClick={handleCardClick}>Card Viewer</button>
        </nav>
    )
}

export default NavBar;