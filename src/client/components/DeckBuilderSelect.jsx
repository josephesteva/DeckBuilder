import React from "react";
import axios from "axios";
import "../styles/DeckBuilderSelect.css";

function DeckBuilderSelect({
  selectedDeck,
  setSelectedDeck,
  userDeck,
  decks,
  token,
  userName,
  setDecks,
  setUserDeck,
  fetchDeckCards,
}) {
  //Handles when a deck is changed in the dropdown
  const handleDeckChange = (event) => {
    const deckId = Number(event.target.value);
    const deck = decks.find((deck) => deck.id === deckId);
    setSelectedDeck(deck);

    //updates userDeck to display current selected deck
    fetchDeckCards(deckId);
  };
  //handles when delete button is clicked
  const deleteDeck = () => {
    if (selectedDeck) {
      if (!window.confirm("Are you sure you want to delete the deck: " + selectedDeck.name + "?")) {
        return;
      }
      axios
        .delete(`api/decks/${selectedDeck.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const updatedDecks = decks.filter((deck) => deck.id !== selectedDeck.id);
          setDecks(updatedDecks);

          //select the first deck in the list if there are still decks
          if (updatedDecks.length > 0) {
            setSelectedDeck(updatedDecks[0]);
            fetchDeckCards(updatedDecks[0].id);
          } else {
            //if there are no decks, set user deck and selected deck to null
            setSelectedDeck(null);
            setUserDeck([]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  return (
    <div>
      {decks.length > 0 && (
        <div className="deck-select-container">
          <h4>Selected Deck</h4>
          <p>
            {" "}
            {selectedDeck ? `${selectedDeck.name} by ${userName}` : "No deck selected"} ({userDeck.length} / 60)
          </p>
          <br></br>
          <div className="select-container">
            <select value={selectedDeck ? selectedDeck.id : ""} onChange={handleDeckChange}>
              {decks.map((deck) => (
                <option key={deck.id} value={deck.id}>
                  {deck.name}
                </option>
              ))}
            </select>
            <button onClick={deleteDeck} className="delete-button-userdeck">
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeckBuilderSelect;
