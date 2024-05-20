import React, { useContext }from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Context } from '../contexts/Context';

/**
 * GoogleRegister component that handles Google OAuth registration.
 * It decodes the JWT response from Google and logs in the user.
 * 
 * @component
 * @example
 * return (
 *   <GoogleRegister />
 * )
 */
function GoogleRegister() {  
    const navigate = useNavigate();
    const { login } = useContext(Context);

    /**
   * Handles the Google credential response.
   * 
   * @param {Object} response - The response object containing the credential.
   */
    function handleCredentialResponse(response) {
        const { credential } = response;
        try {
            const decoded = jwtDecode(credential);
            const userData = {
              firstName: decoded.given_name,
              lastName: decoded.family_name,
              email: decoded.email,
              googleId: decoded.sub
            }
            
            login(userData);
        } catch (error) {
            console.error('Failed to decode JWT:', error);
        }
    }
  
    return (
      <GoogleLogin
        onSuccess={credentialResponse => {
            handleCredentialResponse(credentialResponse);
            navigate('/');
        }}
        onError={() => {
          console.error('Registration Failed');
        }}
      />
    );
}

export default GoogleRegister;