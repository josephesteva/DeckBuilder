import axios from 'axios'
import React, { useState } from 'react'

function DeckInfo({ deck }) {
	const [tempName, setTempName] = useState("")
	const [editingName, setEditingName] = useState(false)
	const [tempDescription, setTempDescription] = useState("")
	const [editingDescription, setEditingDescription] = useState(false)

	const handleEditName = () => {
		setTempName(deck.name)
		setEditingName(!editingName)
	}

	const handleUpdateName = async () => {
		try {
			console.log(deck.id);
			const { data } = await axios.patch(`/api/decks/${deck.id}`,
				{
					name: tempName,
					description: deck.description
				},
				{
					headers: { 
						Authorization: "Bearer " + window.localStorage.getItem('token') 
					}
				})
				console.log(data);
		} catch (error) {
			console.error(error);
		}
		deck.name = tempName
		setEditingName(!editingName)
	}

	return (
		<>
			<div>DeckInfo</div>
			<h2>{deck.name}</h2>
			<h3>Trainer: {deck.user.username}</h3>
			<h4>{deck.description}</h4>
			{deck.user.id == window.localStorage.getItem('userId') ? (
				<>
					{!editingName ? (
						<>
							<h2>{deck.name}</h2>
							<button onClick={handleEditName}>Edit Name</button>
						</>
					) : (
						<>
							<input
								value={tempName}
								onChange={(e) => setTempName(e.target.value)}
							/>
							<button onClick={handleUpdateName}>Save changes</button>
							<button onClick={handleEditName}>Discard changes</button>
						</>
					)}
					<h3>Trainer: {deck.user.username}</h3>
					<h4>{deck.description}</h4>
					<button>Edit Description</button>
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