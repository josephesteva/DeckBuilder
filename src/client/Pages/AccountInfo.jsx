import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Comment from "../components/Comment";
import "../styles/AccountInfo.css";

export default function AccountInfo() {
  const [userInfo, setUserInfo] = useState(null);
  const [userDecks, setUserDecks] = useState(null);
  const [showUpdate, setShowUpdate] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(`/api/users/current`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const userData = await response.json();
        console.log(userData);
        const deckRes = await fetch(`/api/decks/user/${userData.id}`);
        const deckData = await deckRes.json();
        console.log(deckData);
        setUserInfo(userData);
        setUserDecks(deckData);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    }
    fetchUser();
  }, []);

  const handleUpdate = async (event) => {
    event.preventDefault();
    const newData = {
      username,
      email,
    };

    try {
      const response = await fetch("/api/users/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Update successful:", data);
        setUserInfo(data);
      } else {
        const errorData = await response.json();
        console.error("Update failed:", errorData.message);
      }
    } catch (error) {
      console.error("Error during Login:", error);
    }
  };

  const deleteAccount = async () => {
    try {
      const response = await fetch(`/api/users/${localStorage.getItem("userId")}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const result = await response.json();
      console.log(result);
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      localStorage.removeItem("isAdmin");
      navigate("/");
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  if (!userInfo) {
    return <div>Loading...</div>; // Display while data is loading
  }

  return (
    <>
      <h2 className="account-heading">Account</h2>
      <section className="account-container">
        <h1>User: {userInfo.username}</h1>
        <h2>E-mail: {userInfo.email}</h2>

        <button onClick={() => setShowUpdate(true)}>Update Info</button>
        {showUpdate && (
          <form onSubmit={handleUpdate}>
            <div>
              <label>Change Username</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div>
              <label>Change Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <button type="submit">Update</button>
            <button type="button" onClick={() => setShowUpdate(false)}>
              Cancel
            </button>
          </form>
        )}
        <button onClick={() => setDeleteConfirm(true)}>Delete Account</button>
        {deleteConfirm && (
          <>
            <h2>Are you sure you want to delete your account?</h2>
            <button onClick={() => deleteAccount()}>I'm Sure</button>
            <button onClick={() => setDeleteConfirm(false)}>Cancel</button>
          </>
        )}
        {/* <button onClick={() => navigate(-1)}>Go Back</button> */}

        <h2>Decks: </h2>
        <ul>
          {userDecks.length ? (
            userDecks.map((deck) => (
              <Link to={`/deck/${deck.id}`} className="follow-link" key={deck.id}>
                {deck.name}
              </Link>
            ))
          ) : (
            <p className="follow-link">This user does not have any decks</p>
          )}
        </ul>
        <div className="">
          <h2>Liked Decks:</h2>
          <ul>
            {userInfo.Like ? (
              userInfo.Like.map((like) => (
                <Link to={`/deck/${like.deck.id}`} className="follow-link" key={like.deck.id}>
                  {like.deck.name}
                </Link>
              ))
            ) : (
              <li>User has not liked any decks</li>
            )}
          </ul>
        </div>
        <div className="follow-container">
          <div>
            <h2>Followers:</h2>
            <ul>
              {userInfo.followers.length ? (
                userInfo.followers.map((follower) => {
                  return (
                    <Link to={`/account/${follower.id}`} className="follow-link" key={follower.id}>
                      {follower.username}
                    </Link>
                  );
                })
              ) : (
                <p>User does not have any followers</p>
              )}
            </ul>
          </div>
          <div>
            <h2>Following:</h2>
            <ul>
              {userInfo.following.length ? (
                userInfo.following.map((followed) => {
                  return (
                    <Link to={`/account/${followed.id}`} className="follow-link" key={followed.id}>
                      {followed.username}
                    </Link>
                  );
                })
              ) : (
                <p>User is not following any other users</p>
              )}
            </ul>
          </div>
        </div>
        <h2>Deck Comments:</h2>
        <ul>
          {userInfo.comments.length ? (
            userInfo.comments.map((comment) => (
              <Link to={`/deck/${comment.deckId}`} className="comment-link" key={comment.id}>
                <h3>{comment.deck.name}</h3>
                <p>{comment.content}</p>
              </Link>
            ))
          ) : (
            <p>User has not commented on any decks</p>
          )}
          {/* {userInfo.comments.map((comment) => (
          <Comment comment={comment} />
        ))} */}
        </ul>
      </section>
    </>
  );
}
