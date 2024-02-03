import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

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
			const { data } = await axios.patch(`/api/decks/${deck.id}`,
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
					<Link to={`/account/${deck.user.id}`}>
						<h2>Trainer: {deck.user.username}</h2>
					</Link>
					{!editingDescription ? (
						<>
							<h3>Deck Description: {deck.description}</h3>
							<button onClick={handleEditDescription}>Edit Description</button>
						</>
					) : (
						<>
							<textarea
								value={tempDescription}
								onChange={(e) => setTempDescription(e.target.value)}
								style={{ height: "100px", width: "300px" }}
							/>
							<button onClick={handleUpdateDescription}>Save Changes</button>
							<button onClick={handleEditDescription}>Discard Chages</button>
						</>
					)}
				</>
			) : (
				<>
					<h1>{deck.name}</h1>
					<Link to={`/account/${deck.user.id}`}>
						<h2>Trainer: {deck.user.username}</h2>
					</Link>
					<h3>Deck Description: {deck.description}</h3>
				</>
			)}
		</>
	)
}

export default DeckInfo