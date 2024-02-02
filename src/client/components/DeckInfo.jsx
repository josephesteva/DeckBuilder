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

	const handleEditDescription = () => {
		setTempDescription(deck.description)
		setEditingDescription(!editingDescription)
	}

	const handleUpdateName = async () => {
		try {
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

	const handleUpdateDescription = async () => {
		try {
			const {data} = await axios.patch(`/api/decks/${deck.id}`,
			{
				name: deck.name,
				description: tempDescription
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
		deck.description = tempDescription
		setEditingDescription(!editingDescription)
	}

	return (
		<>
			<div>DeckInfo</div>
			{deck.user.id == window.localStorage.getItem('userId') ? (
				<>
					{!editingName ? (
						<>
							<h1>{deck.name}</h1>
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
					<h2>Trainer: {deck.user.username}</h2>
					{!editingDescription ? (
						<>
							<h3>{deck.description}</h3>
							<button onClick={handleEditDescription}>Edit Description</button>
						</>
					) : (
						<>
							<textarea
								value={tempDescription}
								onChange={(e) => setTempDescription(e.target.value)}
								style={{ height: "100px", width: "300px" }}
							/>
							<button onClick = {handleUpdateDescription}>Save Changes</button>
							<button onClick={handleEditDescription}>Discard Chages</button>
						</>
					)}
					<p>The current user owns this deck</p>
				</>
			) : (
				<>
					<h1>{deck.name}</h1>
					<h2>Trainer: {deck.user.username}</h2>
					<h3>{deck.description}</h3>
					<p>NOT MY DECK</p>
				</>
			)}
		</>
	)
}

export default DeckInfo