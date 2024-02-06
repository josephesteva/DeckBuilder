import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from 'react-router-dom';
import UserFollow from "../components/UserFollow";

export default function ProfileInfo() {
	const [userInfo, setUserInfo] = useState(null);
	const [userDecks, setUserDecks] = useState(null);
	const navigate = useNavigate();
	const userId = useParams().id;

	const updateFollowers = () => {
		fetchUser();
	}

	async function fetchUser() {

		try {
			const response = await fetch(`/api/users/${userId}`);
			const userData = await response.json();
			const deckRes = await fetch(`/api/decks/user/${userData.id}`);
			const deckData = await deckRes.json();
			setUserInfo(userData);
			setUserDecks(deckData);
		} catch (error) {
			console.error('Failed to fetch user:', error);
		}
	}

	useEffect(() => {
		fetchUser();
	}, [userInfo]);

	if (!userInfo) {
		return <div>Loading...</div>; // Display while data is loading
	}


	return (
		<section>
			<h1>{userInfo.username}'s Page</h1>
			<h2>E-mail: {userInfo.email}</h2>
			<div onClick={updateFollowers}>
				<UserFollow id={userInfo.id} username={userInfo.username} />
			</div>
			<h2>Followers:</h2>
			<ul>
				{userInfo.followers.map((follower) => (
					<li key={follower.id}>{follower.username}</li>
				))}
			</ul>
			<h2>Following:</h2>
			<ul>
				{userInfo.following.map((followed) => (
					<li key={followed.id}>{followed.username}</li>
				))}
			</ul>
			<h2>Decks: </h2>
			<ul>
				{userDecks.map((deck) => (
					<Link key={deck.id} to={`/deck/${deck.id}`}>
						<li>{deck.name}</li>
					</Link>
				))}
			</ul>
			<h2>Comments: </h2>
			<ul>
				{userInfo.comments.map((comment) => (
					<Link key={comment.id} to={`/deck/${comment.deckId}`}>
						<li>{comment.content}</li>
					</Link>
				))}
			</ul>
			<button onClick={() => navigate(-1)}>Go Back</button>
		</section>
	);
}