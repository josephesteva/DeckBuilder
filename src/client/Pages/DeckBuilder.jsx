import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cards from '../components/Cards';
import DeckBuilderNav from '../components/DeckBuilderNav';
import DeckBuilderDeck from '../components/DeckBuilderDeck';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import "../App.css";
import "../styles/DeckBuilder.css";


const DeckBuilder = () => {
  //stores all the users decks
  const [decks, setDecks] = useState([]);
  //keeps track of the selected deck in the drop down
  const [selectedDeck, setSelectedDeck] = useState(null);
  //stores the user deck-cards of the selected deck
  const [userDeck, setUserDeck] = useState([]);

  //logged in users token and info
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName');
  const isTemp = localStorage.getItem('isTemp');

  const navigate = useNavigate();

  //this function fetches all the decks of the logged in user
  const fetchDecks = () => {
    axios.get('api/decks/mydecks', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setDecks(response.data);

        // If there are any decks, select the first one and fetch its cards
        if (response.data.length > 0) {
          const firstDeck = response.data[0];
          setSelectedDeck(firstDeck);
          fetchDeckCards(firstDeck.id);
        }
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  useEffect(() => {
    fetchDecks();
  }, [token]);

  // Fetches the cards of the selected deck and stores into userDeck
  const fetchDeckCards = (deckId) => {
    axios.get(`/api/deckcards/${deckId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setUserDeck(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  //when a user clicks on exit now, temp user is logged out and deleted
  const handleExitTryNow = async () => {
    try {
      await axios.delete(`api/users/temp/${userId}`);
      localStorage.clear();
      navigate('/'); 
    } catch (error) {
      console.error(error);
    }
  };

  //when a user registers, temp account get tokenized
  const handleRegister = async (username, email, password) => {
    try {
      const response = await axios.patch(`/auth/registertemp/${userId}`, {
        username,
        email,
        password
      });
      const token = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('isTemp', 'false');

      if(token){
        const decodedToken = jwtDecode(token);
        localStorage.setItem('userId', decodedToken.id);
        localStorage.setItem('userName', decodedToken.username);
        localStorage.setItem('isAdmin', decodedToken.isAdmin);
      }
      navigate('/deckbuilder'); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>

      {isTemp === 'true' && (
        <>
          <button onClick={handleExitTryNow}>Exit Try Now</button>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleRegister(e.target.username.value, e.target.email.value, e.target.password.value);
          }}>
            <input name="username" type="text" placeholder="Username" required />
            <input name="email" type="email" placeholder="Email" required />
            <input name="password" type="password" placeholder="Password" required />
            <button type="submit">Register</button>
          </form>
          <p>WARNING: Register an account if you want to save your decks</p>
        </>
      )}
      <h2 className="deckbuilder-heading">Deck Builder</h2>

      <DeckBuilderNav
        selectedDeck={selectedDeck}
        setSelectedDeck={setSelectedDeck}
        userDeck={userDeck}
        decks={decks}
        token={token}
        userName={userName}
        userId={userId}
        fetchDecksCards={fetchDeckCards}
        setDecks={setDecks}
        setUserDeck={setUserDeck}
      />

      <DeckBuilderDeck
        userDeck={userDeck}
        token={token}
        setUserDeck={setUserDeck}
        selectedDeck={selectedDeck}
      />

      <Cards selectedDeck={selectedDeck}
        fetchDeckCards={fetchDeckCards}
        token={token}
        userDeck={userDeck}
      />

    </div>
  );
};

export default DeckBuilder;

