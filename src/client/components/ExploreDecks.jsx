
import { Link } from "react-router-dom";
import ExploreCards from "./ExploreCards";

const ExploreDecks = ({ decks, handleDeckHover, selectedDeck, deckOfCards }) => {
  return (
    <div className="explore-container">
      {decks.map((deck) => (
        <Link to={`/deck/${deck.id}`} key={deck.id}>
          <div className="deck-container" onMouseEnter={() => handleDeckHover(deck.id)}>
            <div className="deck-item">
              <div className="deck-info">
                <strong>{deck.name}</strong> - Created by Trainer {deck.user.username}
              </div>
              <img src="/images/pokemondeck.jpg" alt="Pokemon deck cover"></img>
              <div className='icon-container'>
                <img src='/images/likes.png' alt='likes' className='icons'></img>
                <p>{deck.Like.length}</p>
                <img src='/images/comments.png' alt='comments' className='icons'></img>
                <img src='/images/pokemon-cards-logo.png' alt='cards logo' className='icons'></img>
                <p>{deck.numCards}</p>
              </div>
            </div>

            {selectedDeck === deck.id && (
              <ExploreCards deckOfCards={deckOfCards} />
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};
export default ExploreDecks;