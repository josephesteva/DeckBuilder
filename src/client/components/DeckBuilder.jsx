import React from 'react';
import Cards from './Cards';
import UserDeck from './UserDeck';
import '../App.css'; 

const DeckBuilder = () => {
    return (
      <div className="deck-builder-container">
        <UserDeck />
        <Cards />
      </div>
    );
  };


export default DeckBuilder;