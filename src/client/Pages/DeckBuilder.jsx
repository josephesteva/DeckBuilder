import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import Cards from '../components/Cards';
import DeckBuilderNav from '../components/DeckBuilderNav';
import DeckBuilderDeck from '../components/DeckBuilderDeck';
import "../App.css";

const DeckBuilder = () => {
  //stores all the users decks
  const [decks, setDecks] = useState([]);
  //keeps track of the selected deck in the drop down
  const [selectedDeck, setSelectedDeck] = useState(null);
  //stores the user deck-cards of the selected deck
  const [userDeck, setUserDeck] = useState([]);
  
  //logged in users token and info
  const token = localStorage.getItem('token');
  let userId;
  let userName;

  if(token){
    const decodedToken = jwtDecode(token);
    userId = decodedToken.id;
    userName = decodedToken.username;
  }
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
  
  return (
    <div>
      <h2 className="deck-heading">Deck Builder</h2>

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

      <Cards selectedDeck={selectedDeck} fetchDeckCards={fetchDeckCards} />
    </div>
  );
};

export default DeckBuilder;

