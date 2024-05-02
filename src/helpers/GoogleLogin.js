import React, { useContext }from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Context } from '../Context';

function Login() {  
    const navigate = useNavigate();
    const { setUserSession } = useContext(Context);

    function handleCredentialResponse(response) {
        const { credential } = response;
        try {
            const decoded = jwtDecode(credential);
            console.log('Decoded JWT:', decoded);
            setUserSession(decoded);
        } catch (error) {
            console.error('Failed to decode JWT:', error);
        }
    }
  
    return (
      <GoogleLogin
        onSuccess={credentialResponse => {
            handleCredentialResponse(credentialResponse);
            console.log(credentialResponse);
            navigate('/');
        }}
        onError={() => {
          console.error('Login Failed');
        }}
      />
    );
}

export default Login;