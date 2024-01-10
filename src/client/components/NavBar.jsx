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


    return (
        <nav>
            <button onClick={handleHomeClick}>Home</button>
            <button onClick={handleLoginClick}>Login</button>
            <button onClick={handleRegisterClick}>Register</button>
            <button>Account Page</button>
            <button>Deck Viewer</button>
        </nav>
    )
}

export default NavBar;