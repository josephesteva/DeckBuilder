import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Comment({ comment, userId }) {
	const [tempComment, setTempComment] = useState(comment.content)
	const [editing, setEditing] = useState(false)
	const [date, setDate] = useState("")

	const handleEditClick = () => {
		setTempComment(comment.content)
		setEditing(!editing)
	}

	useEffect(() => {
		const jsDate = new Date(comment.date)
		setDate(String(jsDate))
	}, [])

	const handleUpdateComment = async () => {
		console.log(tempComment);
		console.log(comment.id);
		const { data: updatedComment } = await axios.patch(`/api/comments/${comment.id}`,
		{
			content: tempComment
		},
		{
			headers: {
				Authorization: "Bearer " + localStorage.getItem('token')
			}
		})
		comment.content = tempComment
		setEditing(!editing)
		console.log(updatedComment);
	}

	return (
		<>
			<div style={{ border: "solid black .1em", margin: ".5em", borderRadius: ".5em"  }}>
				{
					!editing ? (
						<p>{comment.content}</p>
					) : (
						<>
							<textarea
								value={tempComment}
								onChange={(e) => setTempComment(e.target.value)}
								style={{ height: "100px", width: "300px" }}
							/>
							<br></br>
							<button onClick={handleUpdateComment}>Post Changes</button>
							<button onClick={handleEditClick}>Discard Changes</button>
						</>
					)
				}
				<p> Posted by {comment.user.username} on {date.slice(0, 24)}</p>
				{comment.userId == localStorage.getItem('userId') && !editing ?
					(
						<button onClick={handleEditClick}>Edit Comment</button>
					) : (
						<></>
					)}
			</div>
		</>
	)
}

export default Comment