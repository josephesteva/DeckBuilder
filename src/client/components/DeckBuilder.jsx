import React from 'react';
import UserDeck from './UserDeck';
import '../App.css'; 

const DeckBuilder = () => {
    return (
      <div className="deck-builder-container">
        <UserDeck />
      </div>
    );
  };

export default DeckBuilder;