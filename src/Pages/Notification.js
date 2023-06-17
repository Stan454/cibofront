import React, { useState } from 'react';
import axios from 'axios';

const Notification = () => {
  const [notification, setNotification] = useState('');

  const handleNotificationChange = (e) => {
    setNotification(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the notification to the backend
      await axios.post('http://localhost:8080/notifications', { message: notification });

      // Reset the form after successful submission
      setNotification('');
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Notification:
          <input type="text" value={notification} onChange={handleNotificationChange} />
        </label>
        <button type="submit">Send Notification</button>
      </form>
    </div>
  );
};

export default Notification;
