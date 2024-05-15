import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from "jwt-decode";
import NewEatsApi from './Api';

export const Context = createContext();

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
      }
    }, []);

    const postRegistrationData = async(formData) => {
      try {
          setIsLoading(true);
          const token = formData.googleId ? 
            await NewEatsApi.googleRegister(formData) :
            await NewEatsApi.registerUser(formData);
          const decodedToken = jwtDecode(token);

          setToken(token);
          localStorage.setItem('token', token);
          setUser(decodedToken);
          setIsLoading(false);
      } catch(e) {
          console.error(`Error:`, e);
      }
    }

    const login = async(formData) => {
      try {
          setIsLoading(true);
          const token = await NewEatsApi.loginUser(formData);
          const decodedToken = jwtDecode(token);

          setToken(token);
          localStorage.setItem('token', token);
          setUser(decodedToken)
          setIsLoading(false);
      } catch(e) {
          if(e[0] === "Request failed with status code 401"){
              navigate('/NotAuthorized');
          }
          console.error(`Error:`, e);
      }
    }
    
    const logout = () => {
      setToken("");
      localStorage.clear();
      setUser({});
      navigate('/');
    }

    const apiTest = () => {
      // const token = localStorage.getItem('token');
      // const decodedToken = jwtDecode(token);
      // NewEatsApi.getUser(decodedToken.user_id);
      console.log(`user: ${JSON.stringify(user)}`)
    }

    return (
        <Context.Provider value={{ 
            isLoading,
            setIsLoading,
            user,
            postRegistrationData,
            login,
            logout,
            token,
            apiTest
        }}>
            {children}
        </Context.Provider>
    );
};
