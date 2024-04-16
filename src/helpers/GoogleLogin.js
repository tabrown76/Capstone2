import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

function Login() {  
    function handleCredentialResponse(response) {
        const { credential } = response;
        try {
            const decoded = jwtDecode(credential);
            console.log('Decoded JWT:', decoded);
        } catch (error) {
            console.error('Failed to decode JWT:', error);
        }
    }
  
    return (
      <GoogleLogin
        onSuccess={credentialResponse => {
            handleCredentialResponse(credentialResponse);
            console.log(credentialResponse);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    );
}

export default Login;