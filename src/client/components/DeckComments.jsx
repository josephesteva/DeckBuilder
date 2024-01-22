import axios from 'axios';
import "../App.css";
import React, { useEffect, useState } from 'react';

const DeckComments = ({id}) => {
	const [deckId, setDeckId] = useState(id)
	const [commentThread, setCommentThread] = useState([])
	const [content, setContent] = useState("")

	const getComments = async () => {
		try {
			console.log(deckId);
			const {data} = await axios.get(`/api/comments/ondeck/${deckId}`)
			setCommentThread(data)
			console.log(data)
		} catch (err) {
			console.error(err);
		}
	}

	useEffect(() => {
		getComments();
	}, [])

	const handleCreateComment = async () => {
		try {
			const { data: comment } = await axios.post("/api/comments/currentuser",
				{ deckId, content },
				{
					headers: {
						Authorization: "Bearer " + window.localStorage.getItem("token"),
					}
				});
			getComments();
			console.log(comment);
		} catch (err) {
			console.error(err);
		}
	}

	// const handleShowComments = async () => {
	// 	try {
	// 		console.log(deckId);
	// 		const {data} = await axios.get(`/api/comments/ondeck/${deckId}`)
	// 		setCommentThread(data)
	// 		console.log(data)
	// 	} catch (err) {
	// 		console.error(err);
	// 	}
		
	// }

	return (
		<>
			<div>
				{/* <h4>Deck ID: </h4>
				<input
					placeholder="Deck ID here"
					value={deckId}
					onChange={(e) => setDeckId(e.target.value)}
				/>
				<hr /> */}
				<h3>Comments</h3>
				{/* <button onClick={handleShowComments}>Show Comments</button> */}
				<div>
					{commentThread.map((comment) => (
						<div style={{border: "solid black .1em", margin: ".5em"}} key={comment.id} >
							<p> {comment.content}</p>
							<p> Posted by {comment.user.username} at {comment.date}</p>
						</div>
					))}
				</div>
				<hr />
				<textarea
					placeholder="Input comment here..."
					value={content}
					onChange={(e) => setContent(e.target.value)}
					style={{ height: "100px", width: "300px" }}
				/>
				<button onClick={handleCreateComment}>Post Comment</button>
			</div>
		</>
	)
}

export default DeckComments;