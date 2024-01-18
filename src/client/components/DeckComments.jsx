import axios from 'axios';
import "../App.css";
import React, { useEffect, useState } from 'react';

const DeckComments = () => {
	const [ deckId, setDeckId ] = useState("")
	const [ content, setContent ] = useState("")

	const handleCreateComment = async () => {
		try {
			const { data: comment } = await axios.post("/api/comments/currentuser",
				{ deckId, content },
				{
					headers: {
						Authorization: "Bearer " + window.localStorage.getItem("token"),
					}
				});
				console.log(comment);
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<>
			<div>
				<h3>Comments</h3>
				<hr />
				<input
					placeholder="Deck ID here"
					value = {deckId}
					onChange={(e) => setDeckId(e.target.value)}
				/>
				<hr/>
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