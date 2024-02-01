import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';

export default function ProfileInfo() {
  const [userInfo, setUserInfo] = useState(null);
  const [userDecks, setUserDecks] = useState(null);
  const navigate = useNavigate();
  const userId = useParams().id;

  useEffect(() => {
    async function fetchUser() {

      try {
        const response = await fetch(`/api/users/${userId}`);
        const userData = await response.json();
        console.log(userData);
        const deckRes = await fetch(`/api/decks/user/${userData.id}`);
        const deckData = await deckRes.json();
        console.log(deckData);
        setUserInfo(userData);
        setUserDecks(deckData);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    }
    fetchUser();
  }, []);

  if (!userInfo) {
    return <div>Loading...</div>; // Display while data is loading
  }


  return (
    <section>
      <h1>{userInfo.username}'s Page</h1>
      <h2>E-mail: {userInfo.email}</h2>
      <h2>Followers:</h2>
      <ul>
        {userInfo.followers.map((follower) => { return (<li key={follower.id}>{follower.username}</li>) })}
      </ul>
      <h2>Following:</h2>
      <ul>
        {userInfo.following.map((followed) => { return (<li key={followed.id}>{followed.username}</li>) })}
      </ul>
      <h2>Decks: </h2>
      <ul>
        {userDecks.map((deck) => { return (<li key={deck.id}>{deck.name}</li>) })}
      </ul>
      <h2>Comments: </h2>
      <ul>
        {userInfo.comments.map((comment) => { return (<li key={comment.id}>{comment.content}</li>) })}
      </ul>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </section>
  );
}