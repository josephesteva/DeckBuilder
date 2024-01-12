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
    const handleLogoutClick = () => {
        setisLoggedIn(false);
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
        </nav>
    )
}

export default NavBar;