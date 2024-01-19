import React from 'react'
import DeckBuilderCreate from './DeckBuilderCreate'
import DeckBuilderSelect from './DeckBuilderSelect'

function DeckBuilderNav({ selectedDeck, setSelectedDeck, userDeck, decks, token,
  userName, userId, fetchDecksCards, setDecks, setUserDeck }) {
  return (
    <div className="user-deck-nav">
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
      <DeckBuilderCreate token={token}
        userId={userId}
        setDecks={setDecks}
        setSelectedDeck={setSelectedDeck}
        fetchDeckCards={fetchDecksCards}
      />
    </div>
  )
}

export default DeckBuilderNav