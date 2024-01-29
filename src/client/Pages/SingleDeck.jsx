import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useParams } from 'react-router-dom';
import DeckBuilderDeck from '../components/DeckBuilderDeck';
import "../App.css";
import DeckComments from '../components/DeckComments';

function SingleDeck() {
	const { id } = useParams();
	const [deck, setDeck] = useState({})
	const [userDeck, setUserDeck] = useState([]);
	// const [userId, setUserid] = useState(null)

	//logged in users token and info
	const token = localStorage.getItem('token');
	let userId
	let userName;

	if (token) {
		const decodedToken = jwtDecode(token);
		// setUserid(decodedToken.id);
		console.log("Infinite Loop");
		userId = decodedToken.userId;
		userName = decodedToken.username;
	}

	useEffect(() => {
		const getDeck = async () => {
			try {
				const { data: foundDeck } = await axios.get(`/api/decks/${id}`)
				setDeck(foundDeck)
			} catch (err) {
				console.error(err);
			}
		}
		getDeck();
	}, [token])

	const handleCreateLike = async () => {
		try {
			const { data: like } = await axios.post(`/api/decks/like/${id}`,
				{},
				{
					headers: {
						Authorization: "Bearer " + window.localStorage.getItem('token')
					}
				})
			setDeck({ ...deck, Like: [...deck.Like, like] })
			console.log(like);
		} catch (err) {
			console.error(err);
		}
	}

	// //logged in users token and info
	// const token = localStorage.getItem('token');
	// let userId
	// let userName;
	

	// if (token) {
	// 	const decodedToken = jwtDecode(token);
	// 	// setUserid(decodedToken.id);
	// 	console.log("Infinite Loop");
	// 	userId = decodedToken.userId;
	// 	userName = decodedToken.username;
	// }

	// Fetches the cards of the selected deck and stores into userDeck
	const fetchDeckCards = (deckId) => {
		axios.get(`/api/deckcards/${deckId}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
			.then(response => {
				setUserDeck(response.data);
			})
			.catch(error => {
				console.error(error);
			});
	};
	fetchDeckCards(id);

	if (!deck.id) {
		return <div>Loading...</div>
	}

	return (
		<>
			<h1>PokeDeck</h1>
			<h1>{deck.name}</h1>
			<button onClick={handleCreateLike}>👍 Like this Deck</button>
			<h3>Likes: {deck.Like.length}</h3>
			<DeckBuilderDeck
				userDeck={userDeck}
				token={token}
				setUserDeck={setUserDeck}
			/>
			<DeckComments
				id={id}
				userId={userId}
			/>
		</>
	)
}

export default SingleDeck