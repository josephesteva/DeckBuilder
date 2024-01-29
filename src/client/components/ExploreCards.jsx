
const ExploreCards = ({ deckOfCards }) => {
  return (
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
  );
};

export default ExploreCards;