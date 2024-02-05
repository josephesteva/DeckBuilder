import React, { useEffect, useState } from 'react'
import axios from 'axios';

function UserFollow({ id }) {
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
			console.log(user);
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
			console.log(user);
		} catch (error) {
			console.error(error);
		}
		followedByUser();
	}

	const followedByUser = async () => {
		const { data: user } = await axios.get(`/api/users/${id}`)
		const followerArray = user.followers;
		console.log(followerArray);
		const status = followerArray.find(user => user.id == window.localStorage.getItem('userId'))
		console.log("follow status", status)
		if (!(status == undefined)) {
			setFollowed(true)
		} else {
			setFollowed(false)
		}
		console.log(followed);
	}

	useEffect(() => {
		followedByUser();
	}, [])

	return (
		<>
			{followed ? (
				<button onClick={handleUnfollow}>Unfollow</button>
			) : (
				<button onClick={handleFollow}>Follow</button>
			)}
		</>
	)
}

export default UserFollow