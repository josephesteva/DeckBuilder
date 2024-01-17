import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function AccountInfo() {
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUser() {

            try {
                const response = await fetch(`http://localhost:3000/api/users/current`,
                                            {
                                                headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`},
                                            });
                const userData = await response.json();
                console.log(userData);
                setUserInfo(userData);
            } catch (error) {
                console.error('Failed to fetch user:', error);
            }
        }
        fetchUser();
    }, []);


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
                    <li>none</li>
                </ul>
            <h2>Following:</h2>
                <ul>
                    <li>none</li>
                </ul>
            <h2>Decks: </h2>
                <ul>
                    <li>none</li>
                </ul>
            <h2>Comments: </h2>
                <ul>
                    <li>none</li>
                </ul>
            <button>Update Info</button>
            <button>Delete Account</button>
            <button onClick={() => navigate(-1)}>Go Back</button>
        </section>
    );
    // Will replace unordered list with JSON showing unordered list with links to respective fields. ex. Decks have links to the individual deck page.
}