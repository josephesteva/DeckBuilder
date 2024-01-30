import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Likes({id}) {
	const [likes, setLikes] = useState([]);
	const [likeStatus, setLikeStatus] = useState(false)

	const handleCreateLike = async () => {
		try {
			const { data: like } = await axios.post(`/api/decks/like/${id}`,
				{},
				{
					headers: {
						Authorization: "Bearer " + window.localStorage.getItem('token')
					}
				})
			fetchLikes();
		} catch (err) {
			console.error(err);
		}
	}

	const fetchLikes = async () => {
		const {data: likeArray} = await axios.get(`/api/decks/likes/${id}`)
		console.log({likes: likeArray});
		setLikes(likeArray)
	}

	useEffect(()=> {
		fetchLikes();
	}, [])

	useEffect(()=> {
		const likeByUser = likes.find(({userId}) => userId == localStorage.getItem('userId'))
		console.log(likeByUser);
		setLikeStatus(likeByUser)
	}, [likes])

	return (
		<>
		<h2>Likes: {likes.length}</h2>
		{likeStatus ? (
			<p>This user liked this deck</p>
		) : (
			<p>User has not liked this deck</p>
		)}
		<button onClick={handleCreateLike}>👍 Like this Deck</button>
		</>
	)
}

export default Likes