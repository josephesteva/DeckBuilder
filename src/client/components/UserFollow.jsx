import React, { useEffect, useState } from 'react'
import axios from 'axios';

function UserFollow({ id, username }) {
	const [followed, setFollowed] = useState(false)

	const handleFollow = async () => {
		try {
			const { data: user } = await axios.patch(`/api/users/follow/${id}`,
				{},
				{
					headers: {
						Authorization: "Bearer " + window.localStorage.getItem('token')
					}
				})
		} catch (error) {
			console.error(error);
		}
		followedByUser();
	}

	const handleUnfollow = async () => {
		try {
			const { data: user } = await axios.patch(`/api/users/unfollow/${id}`,
				{},
				{
					headers: {
						Authorization: "Bearer " + window.localStorage.getItem('token')
					}
				})
		} catch (error) {
			console.error(error);
		}
		followedByUser();
	}

	const followedByUser = async () => {
		const { data: user } = await axios.get(`/api/users/${id}`)
		const followerArray = user.followers;
		const status = followerArray.find(user => user.id == window.localStorage.getItem('userId'))
		if (!(status == undefined)) {
			setFollowed(true)
		} else {
			setFollowed(false)
		}
	}

	useEffect(() => {
		followedByUser();
	}, [])

	return (
		<>
			{followed ? (
				<button onClick={handleUnfollow}>Unfollow {`${username}`}</button>
			) : (
				<button onClick={handleFollow}>Follow {`${username}`}</button>
			)}
		</>
	)
}

export default UserFollow