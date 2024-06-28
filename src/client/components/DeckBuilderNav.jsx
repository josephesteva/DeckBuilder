import React, { useState } from "react";
import DeckBuilderCreate from "./DeckBuilderCreate";
import DeckBuilderSelect from "./DeckBuilderSelect";
import "../styles/DeckBuilderNav.css";

function DeckBuilderNav({
  selectedDeck,
  setSelectedDeck,
  userDeck,
  decks,
  token,
  userName,
  userId,
  fetchDecksCards,
  setDecks,
  setUserDeck,
}) {
  const [isCreatingDeck, setIsCreatingDeck] = useState(false);

  const openCreateDeckInterface = () => {
    setIsCreatingDeck(true);
  };

  return (
    <div className="user-deck-nav">
      {!isCreatingDeck ? (
        <div className="deckbuilder-nav-select">
          <DeckBuilderSelect
            selectedDeck={selectedDeck}
            setSelectedDeck={setSelectedDeck}
            userDeck={userDeck}
            decks={decks}
            token={token}
            userName={userName}
            setDecks={setDecks}
            fetchDeckCards={fetchDecksCards}
            setUserDeck={setUserDeck}
          />
          <button id="create-deck-button" onClick={() => setIsCreatingDeck(true)}>
            Create New Deck
          </button>
        </div>
      ) : (
        <DeckBuilderCreate
          token={token}
          userId={userId}
          setDecks={setDecks}
          setSelectedDeck={setSelectedDeck}
          fetchDeckCards={fetchDecksCards}
          setIsCreatingDeck={setIsCreatingDeck}
        />
      )}
    </div>
  );
}

export default DeckBuilderNav;
