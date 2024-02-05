
import "../styles/Explore.css";

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ExploreContent from '../components/ExploreContent';
import ExploreSearchBar from '../components/ExploreSearchBar';
import ExploreDecks from '../components/ExploreDecks';
import ExploreWatchBattle from "../components/ExploreWatchBattle";

const Explore = () => {
  //stores all the users decks 
  const [decks, setDecks] = useState([]);
  //keeps track of the selected deck in the drop down
  const [selectedDeck, setSelectedDeck] = useState(null);

  //stores the user deck-cards of the selected deck (actually conatains cards)
  const [deckOfCards, setDeckOfCards] = useState([]);

  const [search, setSearch] = useState('');


  //this function fetches all the decks of the logged in user (run auto)
  const fetchDecks = () => {
    axios.get('api/decks')
      .then(response => {
        setDecks(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };


  useEffect(() => {
    fetchDecks();
  }, []);

  console.log(decks)

  // Fetches the cards of the selected deck and stores into DeckOfCards
  const fetchDeckCards = (deckId) => {
    axios.get(`/api/deckcards/${deckId}`)
      .then(response => {
        setDeckOfCards(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };


  const handleDeckHover = (deckId) => {
    console.log("hovered");
    fetchDeckCards(deckId);
    setSelectedDeck(deckId);

  }

  const filteredDecks = decks.filter(deck =>
    deck.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='explore-background'>
      <h2 className="explore-heading">Explore Decks</h2>

      <ExploreSearchBar
        setSearch={setSearch}
      />

      <ExploreDecks
        decks={filteredDecks}
        handleDeckHover={handleDeckHover}
        selectedDeck={selectedDeck}
        deckOfCards={deckOfCards}
      />

      <ExploreContent />
      <ExploreWatchBattle />

    </div>

  );

}

export default Explore;