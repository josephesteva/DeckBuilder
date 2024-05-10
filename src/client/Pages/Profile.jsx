import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import UserFollow from "../components/UserFollow";
import "../styles/Profile.css";

export default function ProfileInfo() {
  const [userInfo, setUserInfo] = useState(null);
  const [userDecks, setUserDecks] = useState(null);
  const navigate = useNavigate();
  const userId = useParams().id;

  const updateFollowers = () => {
    fetchUser();
  };

  async function fetchUser() {
    try {
      const response = await fetch(`/api/users/${userId}`);
      const userData = await response.json();
      const deckRes = await fetch(`/api/decks/user/${userData.id}`);
      const deckData = await deckRes.json();
      setUserInfo(userData);
      setUserDecks(deckData);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [userInfo]);

  if (!userInfo) {
    return <div>Loading...</div>; // Display while data is loading
  }

  return (
    <section className="profile-container">
      <div className="profile-card">
        <h1>{userInfo.username}'s Page</h1>
        <h2>E-mail: {userInfo.email}</h2>
        <div onClick={updateFollowers}>
          <UserFollow id={userInfo.id} username={userInfo.username} />
        </div>
        <h2>Decks: </h2>
        <ul>
          {userDecks.map((deck) => (
            <Link key={deck.id} className="follow-link" to={`/deck/${deck.id}`}>
              {deck.name}
            </Link>
          ))}
        </ul>
        <div className="follow-container">
          <div>
            <h2>Followers:</h2>
            <ul>
              {userInfo.followers.map((follower) => {
                return (
                  <Link to={`/account/${follower.id}`} className="follow-link" key={follower.id}>
                    {follower.username}
                  </Link>
                );
              })}
            </ul>
          </div>
          <div>
            <h2>Following:</h2>
            <ul>
              {userInfo.following.map((followed) => {
                return (
                  <Link to={`/account/${followed.id}`} className="follow-link" key={followed.id}>
                    {followed.username}
                  </Link>
                );
              })}
            </ul>
          </div>
        </div>
        <h2>Comments: </h2>
        <ul>
          {userInfo.comments.map((comment) => (
            <Link to={`/deck/${comment.deckId}`} className="comment-link" key={comment.id}>
              <h3>{comment.deck.name}</h3>
              <p>{comment.content}</p>
            </Link>
          ))}
          {/* {userInfo.comments.map((comment) => (
          <Comment comment={comment} />
        ))} */}
        </ul>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    </section>
  );
}
