import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [statusCode, setStatusCode] = useState(null); // Add state for status code
  const [errorMessage, setErrorMessage] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/login', {
        username: username,
        password: password,
      });

      setStatusCode(response.status); // Store the status code

      if (response.status === 200) {
        // Reset the form
        setUsername('');
        setPassword('');

        // Handle successful login
        // Redirect to the desired page or update the state to show a logged-in state
      } else {
        setErrorMessage('Invalid credentials');
      }
    } catch (error) {
      console.log('Error:', error);
      setErrorMessage('An error occurred');
      if (error.response) {
        setStatusCode(error.response.status); // Store the status code from the error response
      }
    }
  };

  const getMessageByStatusCode = (statusCode) => {
    switch (statusCode) {
      case 200:
        return 'Welcome';
      case 401:
        return 'Wrong combination of username and password, try again';
      case 429:
        return 'Too many login attempts, wait 5 minutes';
      default:
        return '';
    }
  };

  const message = getMessageByStatusCode(statusCode);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">Login</button>
      {statusCode && <p style={{color: 'red'}}>{message}</p>} {/* Display the message based on the status code */}
    </form>
  );
};

export default Login;
