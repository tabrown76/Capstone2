import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
    const [nextPage, setNextPage] = useState(null);
    const navigate = useNavigate();

    const closeModal = () => setIsModalVisible(false);

    const apiCall = () => {
        const url = `${baseUrl}?type=public&q=${queryTerm}&app_id=${appId}&app_key=${appKey}&random=true`;
  
        axios.get(url)
          .then(res => {
            console.log(res);
            const apiIndex = Math.floor(Math.random() * 20);
            setRecipeData(res.data.hits[apiIndex].recipe);
            console.log(recipeData);
            // setNextPage(res.data._links.next.href);
            //check if !recipe.url
            setIsModalVisible(true);
          })
          .catch(error => {
            console.error(`Error fetching data: `, error);
            navigate("/NotFound");
          })
    }

    const nextApiCall = () => {
        axios.get(nextPage)
        .then(res => {
            console.log(res)
            const apiIndex = Math.floor(Math.random() * 20);
            setRecipeData(res.data.hits[apiIndex].recipe);
            console.log(recipeData);
            setNextPage(res.data._links.next.href);
          })
          .catch(error => {
            console.error(`Error fetching data: `, error);
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
            nextApiCall
        }}>
            {children}
        </Context.Provider>
    );
};
