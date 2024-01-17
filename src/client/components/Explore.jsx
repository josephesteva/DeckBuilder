import '../App.css'; 
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Explore = () => {
    const [decks,setDecks] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchAllDecks = async () => {
            try {
                const response = await axios.get('/api/decks/');
                setDecks(response.data)
                console.log(response.data)
            } catch(err) {
                console.error(err)
            }
        };
        fetchAllDecks();
    },[])

    return (
        
        <div>
        <div className="search-bar-cards">
        <input
          type="text"
          placeholder="Search Decks..."
          onChange={e => setSearch(e.target.value)}
        />
      </div>
        <div className="explore-container">
          <h2 className="explore-heading">Explore Decks</h2>
          <div>
            {decks.map((deck) => (
              <div key={deck.id} className="deck-item">
                <strong>{deck.name}</strong> - Created by User {deck.userId}
              </div>
            ))}
          </div>
        </div>
        </div>
      );

}


export default Explore;