import '../App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



const Explore = () => {
    const [decks, setDecks] = useState([]);
    const [search, setSearch] = useState('');
    const [cards, setCards] = useState([]);
    const [showCards, setShowCards] = useState(false);
    const [previewCards, setPreviewCards] = useState([]);


    const fetchAllDecks = async () => {
        try {
            const response = await axios.get('/api/decks/');
            setDecks(response.data);
            // console.log(decks);
        } catch (err) {
            console.error(err);
        }
    };
    
    useEffect(() => {
        fetchAllDecks();
    }, []);


    const fetchCardsForDeck = (deckId) => {
        axios.get(`/api/deckcards/${deckId}`)
          .then(response => {
            setCards(response.data);
            console.log(response.data);
            setPreviewCards(response.data.slice(0, 3));
          })
          .catch(err => {
            console.error(err);
          })
          .finally(() => {
            setShowCards(true);
          });
      };
      
      const handleDeckClick = (deckId) => {
        console.log('Handle Deck Click');
        if (cards.length > 0) {
            fetchCardsForDeck(deckId);
          }
      
      };
    




    return (
        <div>
            <h2 className="explore-heading">Explore Decks</h2>
            <div className="search-bar-cards">
                <input
                    type="text"
                    placeholder="Search Decks..."
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="explore-container">
                {decks.map((deck) => (
									<Link to={`/deck/${deck.id}`}>
                    <div key={deck.id} className="deck-container">
                        <div className="deck-item" onClick={() => handleDeckClick(deck.id)}>
                            <div className="deck-info">
                                <strong>{deck.name}</strong> - Created by Trainer {deck.user.username}
                            </div>
                            <img src="/images/pokemondeck.jpg" alt="Pokemon deck cover"></img>
                        </div>

                        {showCards && (
                            <div className="preview-cards">
                                {previewCards.map((card) => (
                                    <div key={card.id} className="card-preview">

                                        <img>{card.cardImage}</img>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
										</Link>
                ))}
            </div>
        </div>
    );

}


export default Explore;