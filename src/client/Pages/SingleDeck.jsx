import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DeckBuilderDeck from '../components/DeckBuilderDeck';
import "../App.css";
import DeckComments from '../components/DeckComments';
import DeckLikes from '../components/DeckLikes';
import DeckInfo from '../components/DeckInfo';

function SingleDeck() {
	const { id } = useParams();
	const [deck, setDeck] = useState({})
	const [userDeck, setUserDeck] = useState([]);
	const [likeStatus, setLikeStatus] = useState(null)
	// const [userId, setUserid] = useState(null)

	//logged in users token and info
	const token = localStorage.getItem('token');
	const userId = localStorage.getItem('userId');
	const userName = localStorage.getItem('userName');

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

	useEffect(() => {
		const getDeck = async () => {
			try {
				const { data: foundDeck } = await axios.get(`/api/decks/${id}`)
				setDeck(foundDeck)
				console.log({deck: foundDeck});
			} catch (err) {
				console.error(err);
			}
		}
		getDeck();
		const fetchLikeStatus = () => {
			const isLiked = deck.Like.find(({userId})=>userId === userId)
			console.log({status: isLiked});
		}
		if (deck.id) {
			fetchLikeStatus()};
		fetchDeckCards(id);

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
		} catch (err) {
			console.error(err);
		}
	}

	if (!deck.id) {
		return <div>Loading...</div>
	}

	return (
		<>
			<h1>PokeDeck</h1>
			<hr />
			<DeckInfo deck={deck} />
			{/* <h1>{deck.name}</h1>
			<h2>Trainer: {deck.user.username}</h2> */}
			<hr />
			<DeckLikes id = {id}/>
			<hr/>
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