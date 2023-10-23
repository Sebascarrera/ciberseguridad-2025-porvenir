import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthRoute = ({ children }) => {
  const user = useSelector(state => state.user.user); 

  const navigate = useNavigate();

  console.log('Validating user on render', user)

  if (user !== null) {
    return children; 
  } else {
    console.log('debe salir')
    navigate('/', { replace: true });
    return null; 
  }
};

export default AuthRoute;
