import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Likes({ id }) {
	const [likes, setLikes] = useState([]);
	const [userLike, setUserLike] = useState({})
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

	const handleUnlike = async () => {
		try {
			const { data: unlike } = await axios.delete(`/api/decks/like/${userLike.id}`)
			setUserLike({})
			setLikeStatus(false)
			fetchLikes()
		} catch (error) {
			console.error(error);
		}
	}

	const fetchLikes = async () => {
		const { data: likeArray } = await axios.get(`/api/decks/likes/${id}`)
		setLikes(likeArray)
	}

	useEffect(() => {
		fetchLikes();
	}, [])

	useEffect(() => {
		const likeByUser = likes.find(({ userId }) => userId == localStorage.getItem('userId'))
		setUserLike(likeByUser)
		if (likeByUser) {
			setLikeStatus(true)
		}
	}, [likes])

	return (
		<>
			<h2>Likes: {likes.length}</h2>
			{likeStatus ? (
				<>
					<button style={{ backgroundColor: "#00A86B" }} onClick={handleUnlike}>👍 Liked</button>
				</>
			) : (
				<>
					<button onClick={handleCreateLike}>👍 Like</button>
				</>
			)}
		</>
	)
}

export default Likes