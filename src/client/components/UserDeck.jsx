import axios from 'axios';
import "../App.css";

import React, { useEffect, useState } from 'react';


const UserDeck = () => {
    const [userDeck, setUserDeck] = useState([]);
    const userId = 1;
  
    useEffect(() => {
      const fetchUserDeck = async () => {
        try {
          const response = await axios.get(`/api/deckcards/${userId}`);
          setUserDeck(response.data);
          console.log(response.data)
        } catch (err) {
          console.error(err);
        }
      };

  
      fetchUserDeck();
    }, [userId]);

    return (
        
        <div>
          <h2 className="deck-heading">User Deck</h2>
            
        <div className="user-deck-container">
          {userDeck.map((card) => (
              <div key={card.id} className='card-container'>
              <img src={card.card.cardImage} alt={card.name} className='card-image' loading="lazy" />
              <button>Remove</button>
            </div>
          ))}
        </div>
          </div>
      );
    };
    

export default UserDeck;