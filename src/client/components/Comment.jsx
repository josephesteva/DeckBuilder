import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Comment({ comment, userId }) {
	const [tempComment, setTempComment] = useState(comment.content)
	const [editing, setEditing] = useState(false)
	const [datePosted, setDatePosted] = useState("")
	const [dateUpdated, setDateUpdated] = useState("")
	const [deleted, setDeleted] = useState(false)

	const handleEditClick = () => {
		setTempComment(comment.content)
		setEditing(!editing)
	}
	// TODO: Add some form of confirmation for deletion
	const handleDeleteClick = async () => {
		try {
			const { data: deletedComment } = await axios.delete(`/api/comments/${comment.id}`)
			console.log(deletedComment);
			setDeleted(true);
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		const posted = new Date(comment.date)
		setDatePosted(String(posted))
		const updated = new Date(comment.updatedAt)
		setDateUpdated(String(updated))
	}, [])

	const handleUpdateComment = async () => {
		try {
			const { data: updatedComment } = await axios.patch(`/api/comments/${comment.id}`,
				{
					content: tempComment
				},
				{
					headers: {
						Authorization: "Bearer " + localStorage.getItem('token')
					}
				})
		} catch (error) {
			console.error(error);
		}
		comment.content = tempComment
		setEditing(!editing)
	}

	return (
		<> {!deleted ? (
			<>
				<div style={{ border: "solid black .1em", margin: ".5em", padding: ".25em 1em", borderRadius: ".5em", width: "50%" }}>
					{
						!editing ? (
							<h4>{comment.content}</h4>
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
					<p> Posted by {comment.user.username} on {datePosted.slice(0, 24)}
						{dateUpdated == datePosted ? null : " and updated at " + dateUpdated.slice(0, 24)}
					</p>
					{comment.userId == localStorage.getItem('userId') && !editing ?
						(<>
							<button onClick={handleEditClick}>Edit Comment</button>
							<button onClick={handleDeleteClick}>Delete Comment</button>
						</>
						) : (
							<></>
						)}
				</div>
			</>) : (
			null
		)}
		</>
	)
}

export default Comment