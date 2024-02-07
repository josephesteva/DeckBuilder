import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../App.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cards = ({ selectedDeck, fetchDeckCards, token, userDeck }) => {
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState('');
  const [type, setType] = useState(''); 
  const [setName, setSetName] = useState(''); 
  const [superType, setSuperType] = useState('');
  const superTypes = ["Pokémon", "Energy", "Trainer"];

  //we can also fetch these from api, but is it worth?
  const types = [
    "Colorless",
    "Darkness",
    "Dragon",
    "Fairy",
    "Fighting",
    "Fire",
    "Grass",
    "Lightning",
    "Metal",
    "Psychic",
    "Water"
  ];
  const setNames = [
    "Fossil",
    "Jungle",
    "Team Rocket",
    "Base",
    "Legendary Collection",
    "Base Set 2"
  ];

  const MAX_DUPLICATES = 4;
  
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
    card.name.toLowerCase().includes(search.toLowerCase()) &&
    card.mainType.includes(type) &&
    card.setName.includes(setName) &&
    card.superType.includes(superType)
  );

  const handleCardClick = (cardName) => {
    alert(cardName + " was clicked");
  };

  //this function makes sure a card can be in a deck
  const checkCard = (cardName, superType) => {

    //if card is energy or trainer, add to deck
    if(superType === "Energy"){
      return true;
    }

    const count = userDeck.filter(card => card.card.name === cardName).length;

    if(count < MAX_DUPLICATES){
      return true;
    }
    return false;
  }

  const handleAddButtonClick = (event, cardId, cardName, superType) => {
    event.stopPropagation();
    if(!checkCard(cardName, superType)){
      toast.error("Cannot add more than 4 of the same cards")
      return;
    }
    if(userDeck.length >= 60){
      toast.error("Cannot have more than 60 cards on a deck");
      return;
    }
    if (!token) {
      toast.error("You must be logged in to add a card");
      return;
    }
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
      toast.error("Create a deck to add a card");
    }
  };

  const handleSuperTypeChange = (value) => {
    setSuperType(value);
    if (value === "Trainer" || value === "Energy") {
      setType('');
    }
  };

  return (
    <div>
      <div className="search-container" >
      <div className="search-bar-cards">
        <input className='input' type="text" placeholder="Search cards..." onChange={e => setSearch(e.target.value)}></input>
        <svg viewBox="0 0 24 24" className="search__icon">
          <g>
            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z">
            </path>
          </g>
        </svg>
        </div>
      </div>
      <div className="filter-bar-cards">
        <select onChange={e => handleSuperTypeChange(e.target.value)}>
          <option value="">All Super Types</option>
          {superTypes.map((superType, index) => (
            <option key={index} value={superType}>{superType}</option>
          ))}
        </select>
  
        {superType !== "Trainer" && superType !== "Energy" && (
          <select onChange={e => setType(e.target.value)}>
            <option value="">All Types</option>
            {types.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        )}
        <select onChange={e => setSetName(e.target.value)}>
          <option value="">All Sets</option>
          {setNames.map((setName, index) => (
            <option key={index} value={setName}>{setName}</option>
          ))}
        </select>
      </div>
      <div className="cards-container-cards">
        {filteredCards.map(card => (
          <div key={card.id} className="card-cards" onClick={() => handleCardClick(card.name)} style={{ position: 'relative' }}>
            <img src={card.cardImage} alt={card.name} loading="lazy" />
            <button className='add-button-cards' onClick={(event) => handleAddButtonClick(event, card.id, card.name, card.superType, card.mainType)}>Add</button>
          </div>
        ))}
      </div>
    </div>
  );
}
  export default Cards;
  