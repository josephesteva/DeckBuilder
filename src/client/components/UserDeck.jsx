import axios from 'axios';
import "../App.css";
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import Cards from './Cards';

const UserDeck = () => {

  //stores all the users decks
  const [decks, setDecks] = useState([]);
  //keeps track of the selected deck in the drop down
  const [selectedDeck, setSelectedDeck] = useState(null);
  //stores the user deck-cards of the selected deck
  const [userDeck, setUserDeck] = useState([]);

  //input field for new deck name
  const [newDeckName, setNewDeckName] = useState('');
  //input field for new deck description
  const [newDeckDescription, setNewDeckDescription] = useState('');

  //logged in users token and info
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;
  const userName = decodedToken.username;

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

  //This function creates a new empty deck
  const createNewDeck = (event) => {
    event.preventDefault();
    axios.post('api/decks', {
      name: newDeckName,
      description: newDeckDescription,
      userId: userId,
      numCards: 0
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        const newDeck = response.data;
        setDecks(prevDecks => [...prevDecks, newDeck]);
        setSelectedDeck(newDeck);
        setNewDeckName('');
        setNewDeckDescription('');
        fetchDeckCards(newDeck.id);
      })
      .catch(error => {
        console.error(error);
      });
  };

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

  //Handles when a deck is changed in the dropdown
  const handleDeckChange = (event) => {
    const deckId = Number(event.target.value);
    const deck = decks.find(deck => deck.id === deckId);
    setSelectedDeck(deck);

    //updates userDeck to display current selected deck
    fetchDeckCards(deckId);
  };

  //Handles when a card is removed from the selected deck
  const handleRemove = (cardId) => {
    axios.delete('/api/deckcards', {
      data: { deckId: selectedDeck.id, cardId: cardId },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setUserDeck(prevUserDeck => prevUserDeck.filter(card => card.card.id !== cardId));
      })
      .catch(error => {
        console.error(error);
      });
  };

  //handles when delete button is clicked
  const deleteDeck = () => {
    if (selectedDeck) {
      if (!window.confirm('Are you sure you want to delete the deck: ' + selectedDeck.name + "?")) {
        return;
      }
      axios.delete(`api/decks/${selectedDeck.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          setDecks(prevDecks => prevDecks.filter(deck => deck.id !== selectedDeck.id));

          // If the deleted deck was the selected deck, select the first deck in the list
          if (decks[0] && decks[0].id === selectedDeck.id && decks.length > 1) {
            setSelectedDeck(decks[1]);
            fetchDeckCards(decks[1].id);
          } else {
            //if their are no decks, set user deck and selected deck to null
            setSelectedDeck(null);
            setUserDeck([]);
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  return (
    <div>
      <h2 className="deck-heading">Deck Builder</h2>
      <div className="user-deck-nav">
        {decks.length > 0 && (
          <div className="deck-select-container">
            <h4>Selected Deck</h4>
            <p> {selectedDeck ? `${selectedDeck.name} by ${userName}` : 'No deck selected'} ({userDeck.length} / 60)</p>
            <br></br>

            <div className='select-container'>
              <select value={selectedDeck ? selectedDeck.id : ''} onChange={handleDeckChange}>
                {decks.map((deck) => (
                  <option key={deck.id} value={deck.id}>{deck.name}</option>
                ))}
              </select>
              <button onClick={deleteDeck} className="delete-button-userdeck">X</button>
            </div>
          </div>
        )}

        <div className='deck-add-container'>
          <h4>Create New Deck</h4>
          <form className='create-deck-form' onSubmit={createNewDeck}>
            <input
              type="text"
              value={newDeckName}
              onChange={(e) => setNewDeckName(e.target.value)}
              placeholder="Deck Name"
              required
            />

            <input
              type="text"
              value={newDeckDescription}
              onChange={(e) => setNewDeckDescription(e.target.value)}
              placeholder="Deck Description"
              required
            />

            <button type="submit">Create New Deck</button>
          </form>
        </div>
      </div>

      <div className="user-deck-container">
        {userDeck.map((card) => (
          <div key={card.id} className='card-container'>
            <img src={card.card.cardImage} alt={card.card.name} className='card-image' loading="lazy" />
            <button onClick={() => handleRemove(card.card.id)}>Remove</button>
          </div>
        ))}
      </div>
      <Cards selectedDeck={selectedDeck} fetchDeckCards={fetchDeckCards} />
    </div>
  );
};

export default UserDeck;
