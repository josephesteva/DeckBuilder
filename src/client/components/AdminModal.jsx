import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/AdminPage.css";

function UserModal({ userId, onClose }) {
  const [user, setUser] = useState(null);
  const [decks, setDecks] = useState([]);
  const [comments, setComments] = useState([]);

  //fetch clicked user
  useEffect(() => {
    axios.get(`api/users/${userId}`)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, [userId]);

  //fetch users decks
  useEffect(() => {
    axios.get(`api/decks/user/${userId}`)
      .then(response => {
        setDecks(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, [userId]);

  //fetch users comments
  useEffect(() => {
    axios.get(`api/comments/byuser/${userId}`)
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, [userId]);

  //when delete button is clicked
  const deleteDeck = (deckId) => { 
    axios.delete(`api/decks/${deckId}`)
      .then(() => {
        setDecks(decks.filter(deck => deck.id !== deckId));
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  //when delete button is clicked
  const deleteComment = (commentId) => { 
    axios.delete(`api/comments/${commentId}`)
      .then(() => {
        setComments(comments.filter(comment => comment.id !== commentId));
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  const makeAdmin = (userId) => {
    window.alert("Need to implement this");
  }

  const banUser = (userId) => {
    window.alert("Need to implement this");
  }

  return (
    <div className='modal'>
      <div className='modal-content'>
        <span className='close' onClick={onClose}>×</span>
        {user && (
          <div>
            {/* general user information */}
            <h2>
              {user.username} 
              {!user.isAdmin && <button className='make-admin-button' onClick={() => makeAdmin(user.id)}>Make Admin</button>}
              {!user.isAdmin && <button className='ban-button' onClick={() => banUser(user.id)}>Ban User</button>}
            </h2>
            <p>Email: {user.email}</p>
            <p>Is Admin: {user.isAdmin ? 'Yes' : 'No'}</p>
            <h3>User's Decks:</h3>

            {/* renders users decks with a delete button on each*/}
            {decks.map(deck => (
              <div className='deck-container' key={deck.id}>
                <h4>{deck.name}</h4>
                <p>Description: {deck.description}</p>
                <p>Number of Cards: {deck.numCards}</p>
                <button onClick={() => deleteDeck(deck.id)}>Delete</button>
              </div>
            ))}

            {/* render users comments with a delete button on each */}
            <h3>User's Comments:</h3>
            {comments.map(comment => (
              <div className='comment-container' key={comment.id}>
                <p>{comment.content}</p>
                <p>Date: {new Date(comment.date).toLocaleDateString()}</p>
                <button onClick={() => deleteComment(comment.id)}>Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserModal;
