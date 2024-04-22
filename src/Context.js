import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
    const baseUrl = 'https://api.edamam.com/api/recipes/v2';
    const appId = process.env.REACT_APP_APP_ID;
    const appKey = process.env.REACT_APP_APP_KEY;
    const [recipeData, setRecipeData] = useState(null);
    const [queryTerm, setQueryTerm] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [user, setUser] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const navigate = useNavigate();

    const closeModal = () => setIsModalVisible(false);

    const apiCall = (cuisineType) => {
      let url= `${baseUrl}?type=public&q=${encodeURIComponent(queryTerm)}&app_id=${appId}&app_key=${appKey}`;

      if(cuisineType !== undefined && cuisineType !== '') {
        console.log("cuisineType is truthy:", cuisineType);
        url += `&cuisineType=${encodeURI(cuisineType)}`;
      }

      console.log(`options: ${selectedOptions}`);
      if(selectedOptions.length > 0){
        
        const optionsString = selectedOptions.map(option => `&health=${option}`).join('');
        url += optionsString;
      }

      url += `&random=true`;
      console.log(`url: ${url}`)

      axios.get(url)
        .then(res => {
          console.log(res);
          const countFromApi = res.data._links && res.data._links.count ? res.data._links.count : 0;
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

    useEffect(() => {
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
        setUser(JSON.parse(storedUserData));
      }
    }, []);
    

    const setUserSession = userData => {
      setUser(userData);
      localStorage.setItem('userData', JSON.stringify(userData));
    }
  
    const logout = () => {
      setUser(null);
      localStorage.removeItem('userData');
    }

    const handleCheckboxChange = (option) => {
      setSelectedOptions(prev => {
        if (prev.includes(option)) {
          return prev.filter(item => item !== option);
        } else {
          return [...prev, option];
        }
      })
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
            setUserSession,
            logout,
            handleCheckboxChange,
            selectedOptions
        }}>
            {children}
        </Context.Provider>
    );
};
