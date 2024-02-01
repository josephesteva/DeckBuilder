import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminModal from '../components/AdminModal';
import "../styles/AdminPage.css";

function AdminPage() {
  const [users, setUsers] = useState([]);

  //this state stores the user id, but it also lets me know////
  //when to open and close modal///////////////////////////////
  const [selectedUserId, setSelectedUserId] = useState(null);//
  /////////////////////////////////////////////////////////////

  useEffect(() => {
    axios.get('api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  //open user info modal
  const handleThumbnailClick = (userId) => {
    setSelectedUserId(userId);

  };

  //close user info modal
  const handleCloseModal = (userId) => {
    setSelectedUserId(null);
    setUsers(users.filter(user => user.id !== userId));

  };

  return (
    <div>
      <h1>AdminPage</h1>
      <div className='users-container'>
        {users.map(user => (
          <div key={user.id} className='user-item'>
            <img 
              src="/images/pokeball.jpg" 
              alt="Default profile" onClick={() => handleThumbnailClick(user.id)} 
              style={{cursor: 'pointer'}} 
            />
            <div className='user-info'>
              <p>{user.username}</p>
            </div>
          </div>
        ))}
      </div>
      {selectedUserId && <AdminModal userId={selectedUserId} onClose={handleCloseModal} />}
    </div>
  );
}

export default AdminPage;
