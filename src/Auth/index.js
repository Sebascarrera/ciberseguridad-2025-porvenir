import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthRoute = ({ children }) => {
  const user = useSelector(state => state.user.user); 

  const navigate = useNavigate();

  if (user !== null) {
    return children; 
  } else {
    navigate('/', { replace: true });
    return null; 
  }
};

export default AuthRoute;
