import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../App.css";

const Cards = () => {
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

  //TODO: When card is clicked do something
  const handleCardClick = (cardName) => {
    alert(cardName + " was clicked");
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
          <div key={card.id} className="card-cards" onClick={() => handleCardClick(card.name)}>
            <img src={card.cardImage} alt={card.name} loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
