import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from "jwt-decode";
import NewEatsApi from '../Api';

export const Context = createContext();

/**
 * ContextProvider component that provides global state and context to its children.
 * 
 * @component
 * @example
 * return (
 *   <ContextProvider>
 *     <App />
 *   </ContextProvider>
 * )
 */
export const ContextProvider = ({ children }) => {
    const [token, setToken] = useState("");
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
          const decodedToken = jwtDecode(token);
          setUser(decodedToken);
          setToken(token);
          NewEatsApi.token = token;
      }
    }, []);

    /**
   * Handles user registration.
   * 
   * @async
   * @param {Object} formData - The form data for registration.
   */
    const postRegistrationData = async(formData) => {
      try {
          setIsLoading(true);
          const token = formData.googleId ? 
            await NewEatsApi.googleRegister(formData) :
            await NewEatsApi.registerUser(formData);
          const decodedToken = jwtDecode(token);

          setToken(token);
          localStorage.setItem('token', token);
          NewEatsApi.token = token;
          setUser(decodedToken);
          setIsLoading(false);
      } catch(e) {
          console.error(`Error:`, e);
      }
    }

    /**
   * Handles user login.
   * 
   * @async
   * @param {Object} formData - The form data for login.
   */
    const login = async(formData) => {
      try {
          setIsLoading(true);
          const token = await NewEatsApi.loginUser(formData);
          const decodedToken = jwtDecode(token);

          setToken(token);
          localStorage.setItem('token', token);
          NewEatsApi.token = token;
          setUser(decodedToken)
          setIsLoading(false);
      } catch(e) {
          if(e[0] === "Request failed with status code 401"){
              navigate('/NotAuthorized');
          }
          console.error(`Error:`, e);
      }
    }
    
    /**
   * Handles user logout.
   */
    const logout = () => {
      setToken("");
      NewEatsApi.token = "";
      localStorage.clear();
      setUser({});
      navigate('/');
    }

    return (
        <Context.Provider value={{ 
            isLoading,
            setIsLoading,
            user,
            postRegistrationData,
            login,
            logout,
            token
        }}>
            {children}
        </Context.Provider>
    );
};
