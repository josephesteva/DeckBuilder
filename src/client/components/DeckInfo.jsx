import React, {useState}from 'react'

function DeckInfo({ deck }) {
	const [editingName, setEditingName] = useState(false)
	const [editingDescription, setEditingDescription] = useState(false)

	
	return (
		<>
			<div>DeckInfo</div>
			<h2>{deck.name}</h2>
			<h3>Trainer: {deck.user.username}</h3>
			<h4>{deck.description}</h4>
			{deck.user.id == window.localStorage.getItem('userId') ? (
				<>
					<h2>{deck.name}</h2>
					<h3>Trainer: {deck.user.username}</h3>
					<h4>{deck.description}</h4>
					<p>The current user owns this deck</p>
				</>
			) : (
				<>
					<h2>{deck.name}</h2>
					<h3>Trainer: {deck.user.username}</h3>
					<h4>{deck.description}</h4>
					<p>NOT MY DECK</p>
				</>
			)}
		</>
	)
}

export default DeckInfo