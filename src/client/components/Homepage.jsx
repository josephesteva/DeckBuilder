import '../App.css';
import React, { useEffect, useState } from 'react';



const HomePage = () => {
    const [showPortal, setShowPortal] = useState(false);

    const pokemonDeck = [
      '/images/pikachu.webp',
      '/images/blastoise.webp',
      '/images/charizard.webp',
      '/images/lucario.webp',
      '/images/dragonnite.webp',

    ];

    useEffect(() => {
      // Trigger ENTRY animations after a delay 
      const portalAnimationTimeout = setTimeout(() => {
        setShowPortal(true);
      }, 2000);
  
      // Cleanup: Clear the timeout
      return () => clearTimeout(portalAnimationTimeout);
    }, []);

    useEffect(() => {
    // Function to scroll the Pokemon deck
    const scrollPokemonDeck = () => {
      const pokemonDeck = document.querySelector('.pokemon-deck');
      if (pokemonDeck) {
        pokemonDeck.scrollTop += 1; 
      }
    };

    // Set up the interval for auto-scrolling
    const scrollInterval = setInterval(scrollPokemonDeck, 50); // Adjust interval

    // Cleanup: Clear the interval to stop auto-scrolling
    return () => clearInterval(scrollInterval);
  }, []);
    
    
      return (
        <div>

        {!showPortal &&  (
          <div className="bounce-in-top">
            <img src="/images/pokeball.png" alt="Loading Pokeball" />
        </div>
        )}
        
        <div className={`forest-background ${showPortal ? 'portal-enter' : ''}`}>
          
          <div className={`header ${showPortal ? 'header-enter' : ''}`}>
            <h1>Pokemon</h1>
            <h2>DeckBuilder</h2>
          </div>
          <div className="hero-section">
            <h1>Welcome to Your Pokémon TCG Deck Builder</h1>
            <img src='/images/pokeball.jpg' alt='pokeball' className="pokeball"></img>
            <p>Your <strong>source</strong> for building the ultimate Pokémon Trading Card Game decks.</p>
            <p>Unlock the power of Pokémon cards and dominate your battles!</p>
          <div className="trainer-section">
            <aside>
              <h3>Trainer of the Year : Ash Ketchum </h3>
              
              <img src='/images/ash.jpg' alt='pokemon trainer' className="trainer-image"></img>
              <p>S Rank/Pokemon Master</p>
              <button className="try-now-button">Try Now</button>
              
            </aside>
            <div className="community-section">
            <img src="/images/community.jpg" alt="Community Image" className="community-image" />
            <div className="community-text">
                <h3>Join the Community</h3>
                <p>Collaborate and share with the best trainers in the world!</p>
                </div>
      
              
            </div>
            <div className="pokemon-deck">
              {pokemonDeck.map((pokemon, index) => (
                <img key={index} src={pokemon} alt={`pokemon-${index + 1}`} className="pokemon-image"></img>
              ))}
            </div>
          </div>
          </div>
          <div className="cloud-image" style={{ backgroundImage: 'url("/images/cloudsheader.png")' }}></div>
          <div className="cloud-image2" style={{ backgroundImage: 'url("/images/cloudsheader.png")' }}></div>

          

        </div>
        </div>

        
      );
    };

export default HomePage;