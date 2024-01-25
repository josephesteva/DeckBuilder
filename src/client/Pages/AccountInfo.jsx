import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function AccountInfo() {
    const [userInfo, setUserInfo] = useState(null);
    const [userDecks, setUserDecks] = useState(null);
    const [showUpdate, setShowUpdate] = useState(false);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUser() {

            try {
                const response = await fetch(`/api/users/current`,
                                            {
                                                headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`},
                                            });
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


    const handleUpdate = async (event) => {
        event.preventDefault();
        const newData = {
            username,
            email
        }

        
        try {
            const response = await fetch('/api/users/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(newData)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Update successful:', data);
                setUserInfo(data);
            } else {
                const errorData = await response.json();
                console.error('Update failed:', errorData.message);
            }
        } catch (error) {
            console.error('Error during Login:', error);
        }
    }

 /*   const deleteAccount = async () => {
        try{
            const response = await fetch(`http://localhost:3000/api/users/${localStorage.getItem('userId')}`,
                                        {
                                            method: "DELETE",
                                            headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`},
                                        });
            const result = await response.json()
            console.log(result);
            logout();
            navigate(-1);
        } catch (error){
            console.error('Failed to delete user:', error);          
        }

    } */

    if (!userInfo) {
        return <div>Loading...</div>; // Display while data is loading
    } 


    return (
        <section>
            <h1>{userInfo.username}'s Page</h1>
            <h2>E-mail: {userInfo.email}</h2>
            <h2>Followers:</h2>
                <ul>
                    {userInfo.followers.map((follower)=>{return (<li key={follower.id}>{follower.username}</li>)})}
                </ul>
            <h2>Following:</h2>
                <ul>
                    {userInfo.following.map((followed)=>{return (<li key={followed.id}>{followed.username}</li>)})}
                </ul>
            <h2>Decks: </h2>
                <ul>
                    {userDecks.map((deck)=>{return (<li key={deck.id}>{deck.name}</li>)})}
                </ul>
            <h2>Comments: </h2>
                <ul>
                    {userInfo.comments.map((comment)=>{return (<li key={comment.id}>{comment.content}</li>)})}
                </ul>
            <button onClick={() => setShowUpdate(true)}>Update Info</button>
            {showUpdate && 
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
                    <button type="button" onClick={() => setShowUpdate(false)}>Cancel</button>
                </form>}
            <button>Delete Account</button>
            <button onClick={() => navigate(-1)}>Go Back</button>
        </section>
    );
}