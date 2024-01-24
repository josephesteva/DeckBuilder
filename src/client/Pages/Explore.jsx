import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "../App.css";
import { Link } from 'react-router-dom';
import ExploreContent from '../components/ExploreContent';


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

    // [12,3,3,4,5,6,6] deck

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

    // [deck1, deck2, deck3] deck1:{pikachu, some, charizard}

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
            <div className="search-bar-cards">
                <input
                    type="text"
                    placeholder="Search Decks..."
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>



            <div className="explore-container">
                {filteredDecks.map((deck) => (
                    <Link to={`/deck/${deck.id}`}>
                        <div key={deck.id} className="deck-container">
                            <div className="deck-item" onMouseEnter={() => handleDeckHover(deck.id)}>
                                <div className="deck-info">
                                    <strong>{deck.name}</strong> - Created by Trainer {deck.user.username}
                                </div>
                                <img src="/images/pokemondeck.jpg" alt="Pokemon deck cover"></img>
                            </div>

                            {/* make sure selected deck equals the current deck being mapped */}
                            {selectedDeck === deck.id && (
                                <div className="user-deck-container2">
                                    {deckOfCards.map((card) => (
                                        <div key={card.id} className='card-container2'>
                                            <img
                                                src={card.card.cardImage}
                                                alt={card.card.name}
                                                className='card-image2'
                                                loading="lazy"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
            <div className="sticky-image">
                <div className='thought-bubble'>
                    <h2>Hey Guys!!</h2>
                    <p>Be sure to signup for upcoming</p>
                    <p>Pokemon GO events</p>
                </div>
                <img src="/images/Pikachu-Transparent-Background.png" alt="Sticky Image" className='explore-sticky'></img>
            </div>

            <ExploreContent />




            <div className="cloud-image" style={{ backgroundImage: 'url("/images/cloudsheader.png")' }}></div>
            <div className="cloud-image2" style={{ backgroundImage: 'url("/images/cloudsheader.png")' }}></div>
        </div>

    );

}

export default Explore;