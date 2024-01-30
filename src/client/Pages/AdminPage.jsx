import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/AdminPage.css";


function AdminPage() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get('api/users')
      .then(response => {
        setUsers(response.data)
      })
      .catch(error => {
        console.error('There was an error!', error)
      })
  }, [])

  const handleThumbnailClick = (userId) => {
    window.alert(`${userId} was clicked`);
  }

  return (
    <div>
      <h1>AdminPage</h1>
      <div className='users-container'>
        {users.map(user => (
          <div key={user.id} className='user-item'>
            <img src="/images/pokeball.jpg" alt="Default profile" onClick={() => handleThumbnailClick(user.id)} style={{cursor: 'pointer'}} />
            <div className='user-info'>
              <p>{user.username}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
  
  
}

export default AdminPage
