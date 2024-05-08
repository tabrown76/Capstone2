import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import NewEatsApi from './Api';

export const Context = createContext();

export const ContextProvider = ({ children }) => {
    const baseUrl = 'https://api.edamam.com/api/recipes/v2';
    const appId = process.env.REACT_APP_APP_ID;
    const appKey = process.env.REACT_APP_APP_KEY;
    const [recipeData, setRecipeData] = useState(null);
    const [queryTerm, setQueryTerm] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [token, setToken] = useState("");
    const [user, setUser] = useState({});
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [tooManyFilters, setTooManyFilters] = useState(false);
    const navigate = useNavigate();

    const closeModal = () => {
      setIsModalVisible(false);
      setQueryTerm('');
      setSelectedOptions([]);
    } 

    const apiCall = (cuisineType) => {
      let url= `${baseUrl}?type=public&q=${encodeURIComponent(queryTerm)}&app_id=${appId}&app_key=${appKey}`;

      if(cuisineType !== undefined && cuisineType !== '') {
        url += `&cuisineType=${encodeURI(cuisineType)}`;
      }

      if(selectedOptions.length > 0){
        const optionsString = selectedOptions.map(option => `&health=${option}`).join('');
        url += optionsString;
      }

      url += `&random=true`;

      axios.get(url)
        .then(res => {
          console.log(res);
          setTooManyFilters(false);
          const countFromApi = res.data.count ? res.data.count : 0;
          if(countFromApi === 0) setTooManyFilters(true);
          const maxIndex = countFromApi > 0 && countFromApi < 20 ? countFromApi : 20;
          const apiIndex = Math.floor(Math.random() * maxIndex);

          setRecipeData(res.data.hits[apiIndex].recipe);
          //check if !recipe.url
          setIsModalVisible(true);
        })
        .catch(error => {
          console.error(`Error fetching data: `, error);
          navigate("/NotFound");
        })
    }

    useEffect(() => {
      console.log(recipeData);
    }, [recipeData])

    const handleCheckboxChange = (option) => {
      setSelectedOptions(prev => {
        if (prev.includes(option)) {
          return prev.filter(item => item !== option);
        } else {
          return [...prev, option];
        }
      })
    }

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
          const decodedToken = jwtDecode(token);
          setUser(decodedToken);
      }
    }, []);

    const postData = async(formData) => {
      try {
          const token = formData.googleId ? 
            await NewEatsApi.googleRegister(formData) :
            await NewEatsApi.registerUser(formData);
          const decodedToken = jwtDecode(token);

          setToken(token);
          localStorage.setItem('token', token);
          setUser(decodedToken);
      } catch(e) {
          console.error(`Error:`, e);
      }
    }

    const login = async(formData) => {
      try {
          const token = await NewEatsApi.loginUser(formData);
          const decodedToken = jwtDecode(token);

          setToken(token);
          localStorage.setItem('token', token);
          setUser(decodedToken)
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
      // NewEatsApi.getUser(decodedToken.username);
      logout();
      console.log(`user: ${JSON.stringify(user)}`)
    }

    return (
        <Context.Provider value={{ 
            recipeData,
            queryTerm,
            setQueryTerm,
            isModalVisible,
            closeModal,
            apiCall,
            user,
            postData,
            login,
            logout,
            handleCheckboxChange,
            selectedOptions,
            tooManyFilters,
            token,
            apiTest
        }}>
            {children}
        </Context.Provider>
    );
};
