import React from 'react';
import AuthScreen from './AuthScreen.jsx';

const HomePage = () => {
  const user = false; // Placeholder for user authentication state
  return <div>{user ? <HomePage /> : <AuthScreen />}</div>;
};

export default HomePage;
