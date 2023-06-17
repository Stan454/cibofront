import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the CIBO Admin panel</h1>
      <p>
        To create, edit or delete a new dish for your menu, please visit{' '}
        <Link to="/dishes">Dishes</Link>.
      </p>
      <p>
        If you want to send a notification to your customers, go to {' '}
        <Link to="/notification">Notifications</Link>.
      </p>
      <p>
        For managing reservations, navigate to {' '}
        <Link to="/reservations">Reservations</Link>.
      </p>
    </div>
  );
};

export default Home;
