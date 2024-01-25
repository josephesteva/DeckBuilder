import React from 'react'
import axios from 'axios';
function DeckBuilderDeck({ userDeck, setUserDeck, selectedDeck, token }) {
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
    <div className="user-deck-container">
      {userDeck.map((card) => (
        <div key={card.id} className='card-container'>
          <img
            src={card.card.cardImage}
            alt={card.card.name}
            className='card-image'
            loading="lazy"
          />
          <button onClick={() => handleRemove(card.id)}>Remove</button>
        </div>
      ))}
    </div>
  )
}

export default DeckBuilderDeck