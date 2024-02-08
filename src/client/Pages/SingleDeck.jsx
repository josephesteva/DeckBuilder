import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DeckBuilderDeck from '../components/DeckBuilderDeck';
import "../App.css";
import DeckComments from '../components/DeckComments';
import DeckLikes from '../components/DeckLikes';
import DeckInfo from '../components/DeckInfo';
import '../styles/SingleDeck.css'

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
			} catch (err) {
				console.error(err);
			}
		}
		getDeck();
		const fetchLikeStatus = () => {
			const isLiked = deck.Like.find(({ userId }) => userId === userId)
		}
		if (deck.id) {
			fetchLikeStatus()
		};
		fetchDeckCards(id);

	}, [token])

	if (!deck.id) {
		return <div>Loading...</div>
	}

	return (
		<>
			<div className="singleDeck">
				<DeckInfo deck={deck} />
				<hr />
				<DeckLikes id={id} />
				<hr />
				<DeckBuilderDeck
					userDeck={userDeck}
					token={token}
					setUserDeck={setUserDeck}
				/>
				<DeckComments
					id={id}
					userId={userId}
				/>
			</div>
		</>
	)
}

export default SingleDeck