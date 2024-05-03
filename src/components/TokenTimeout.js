import React, { useEffect } from 'react';
import jwt from 'jsonwebtoken';
import { useNavigate } from 'react-router-dom';

function TokenExpiration() {
  const navigate = useNavigate();

  const decodeToken = (token) => {
    try {
      return jwt.decode(token);
    } catch (error) {
      console.error('Error decoding the token', error);
      return null;
    }
  };

  const checkTokenExpired = (token) => {
    const decodedToken = decodeToken(token);

    if (decodedToken && decodedToken.exp) {
      const currentTime = Math.floor(Date.now() / 1000);
      const warningThreshold = 30;
      const timeUntilExpiration = decodedToken.exp - currentTime;

      if (timeUntilExpiration < warningThreshold) {
        alert('Your session will expire soon. Please refresh or log out.');
      }

      if (timeUntilExpiration <= 0) {
        localStorage.removeItem('jwt');
        localStorage.removeItem('user_id');
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const storedToken = localStorage.getItem('jwt');
      if (storedToken) {
        checkTokenExpired(storedToken);
      }
    }, 30 * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [navigate]);

  // This component doesn't need to return anything
  return null;
}

export default TokenExpiration;