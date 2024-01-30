import React from 'react'
import axios from 'axios';
import { useState } from 'react';


function DeckBuilderDeck({ userDeck, setUserDeck, selectedDeck, token }) {
  
  const [flexWrap, setFlexWrap] = useState(false);

  const handleToggle = () => {
    setFlexWrap(!flexWrap);
    console.log("clicked")
  };
  
  //Handles when a card is removed from the selected deck
  const handleRemove = (cardId) => {
    axios.delete(`/api/deckcards/${cardId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setUserDeck(prevUserDeck =>
          prevUserDeck.filter(card => card.id !== cardId));
      })
      .catch(error => {
        console.error(error);
      });
  };
  return (
    <div>
    <button onClick={handleToggle}>Change View</button>
    <div className={`user-deck-container ${flexWrap ? 'flex-wrap' : ''}`}>
      {userDeck.map((card) => (
        <div key={card.id} className='card-container'>
          <img
            src={card.card.cardImage}
            alt={card.card.name}
            className='card-image'
            loading="lazy"
          />
          {selectedDeck && <button onClick={() => handleRemove(card.id)}>Remove</button>}
        </div>
      ))}
    </div>
    </div>
  )
}

export default DeckBuilderDeck