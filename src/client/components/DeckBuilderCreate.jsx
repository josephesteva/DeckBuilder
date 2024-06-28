import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/DeckBuilderCreate.css";

function DeckBuilderCreate({ token, userId, setDecks, setSelectedDeck, fetchDeckCards }) {
  //input field for new deck name
  const [newDeckName, setNewDeckName] = useState("");
  //input field for new deck description
  const [newDeckDescription, setNewDeckDescription] = useState("");

  //This function creates a new empty deck
  const createNewDeck = (event) => {
    event.preventDefault();
    if (!token) {
      toast.error("You must be logged in to create a deck");
      return;
    }
    axios
      .post(
        "api/decks",
        {
          name: newDeckName,
          description: newDeckDescription,
          userId: userId,
          numCards: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const newDeck = response.data;
        setDecks((prevDecks) => [...prevDecks, newDeck]);
        setSelectedDeck(newDeck);
        setNewDeckName("");
        setNewDeckDescription("");
        fetchDeckCards(newDeck.id);
        toast.success("Created new deck with the name" + newDeck.name);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="create-deck-container">
      <h4 className="create-deck-header">Create New Deck</h4>
      <form className="create-deck-form" onSubmit={createNewDeck}>
        <input
          type="text"
          value={newDeckName}
          onChange={(e) => setNewDeckName(e.target.value)}
          placeholder="Deck Name"
          required
        />

        <textarea
          id="create-deck-description"
          type="text"
          value={newDeckDescription}
          onChange={(e) => setNewDeckDescription(e.target.value)}
          placeholder="Deck Description"
          required
        />

        <button type="submit">Create New Deck</button>
      </form>
    </div>
  );
}

export default DeckBuilderCreate;
