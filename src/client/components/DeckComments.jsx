import axios from 'axios';
import "../App.css";
import React, { useEffect, useState } from 'react';
import Comment from './Comment';

const DeckComments = ({ id }) => {
	const [deckId, setDeckId] = useState(id)
	const [commentThread, setCommentThread] = useState([])
	const [content, setContent] = useState("")

	const getComments = async () => {
		try {
			const { data } = await axios.get(`/api/comments/ondeck/${deckId}`)
			setCommentThread(data)
		} catch (err) {
			console.error(err);
		}
	}

	useEffect(() => {
		getComments();
	}, [])

	const handleCreateComment = async () => {
		if (content) {
			try {
				const { data: comment } = await axios.post("/api/comments/currentuser",
				{ deckId, content },
				{
					headers: {
						Authorization: "Bearer " + window.localStorage.getItem("token"),
					}
				});
				getComments();
				setContent("")
				console.log(comment);
			} catch (err) {
				console.error(err);
			}
		 } else {
				console.log("Comment must have info in it");
	}
	}

	return (
		<>
			<div>
				<h3>Comments</h3>
				<div>
					{commentThread.map((comment) => (
						<Comment key={comment.id} comment={comment} />
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