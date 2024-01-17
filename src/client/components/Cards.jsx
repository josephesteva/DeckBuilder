import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../App.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cards = ({selectedDeck, fetchDeckCards}) => {
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get('/api/cards');
        setCards(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCards();
  }, []);

  const filteredCards = cards.filter(card =>
    card.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCardClick = (cardName) => {
    alert(cardName + " was clicked");
  };

  const handleAddButtonClick = (event, cardId, cardName) => {
    event.stopPropagation();
    if (selectedDeck) {
      axios.post('/api/deckcards', {
        deckId: selectedDeck.id,
        cardId: cardId
      }).then(response => {
        console.log(response);
        toast.success(cardName + " was added to the deck: " + selectedDeck.name);
        fetchDeckCards(selectedDeck.id);

      }).catch(error => {
        toast.error(cardName + " is already on deck!");
        console.error(error);
      });
    } else {
      alert("Please select a deck first");
    }
  };

  return (
    <div>
      <div className="search-bar-cards">
        <input
          type="text"
          placeholder="Search cards..."
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="cards-container-cards">
        {filteredCards.map(card => (
                  <div key={card.id} className="card-cards" onClick={() => handleCardClick(card.name)} style={{ position: 'relative' }}>
                  <img src={card.cardImage} alt={card.name} loading="lazy" />
                  <button className='add-button-cards' onClick={(event) => handleAddButtonClick(event, card.id, card.name)}>Add</button>
                </div>
        ))}
      </div>
      <ToastContainer />


    </div>
  );
};

export default Cards;
