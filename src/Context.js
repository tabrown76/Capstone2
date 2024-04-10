import React, { createContext, useState, useEffect } from 'react';
import axios from "axios";
import {jwtDecode} from "jwt-decode";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
    const baseUrl = 'https://api.edamam.com/api/recipes/v2';
    const appId = process.env.REACT_APP_APP_ID;
    const appKey = process.env.REACT_APP_APP_KEY;
    const [recipeData, setRecipeData] = useState(null);
    const [queryTerm, setQueryTerm] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);

    const closeModal = () => setIsModalVisible(false);

    const apiCall = () => {
        const url = `${baseUrl}?type=public&q=${queryTerm}&app_id=${appId}&app_key=${appKey}`;
  
        axios.get(url)
          .then(res => {
            setRecipeData(res.data.hits[0].recipe);
            setIsModalVisible(true);
          })
          .catch(error => {
            console.error(`Error fetching data: `, error);
          })
          console.log(recipeData)
    }

    return (
        <Context.Provider value={{ 
            recipeData,
            queryTerm,
            setQueryTerm,
            isModalVisible,
            closeModal,
            apiCall
        }}>
            {children}
        </Context.Provider>
    );
};
