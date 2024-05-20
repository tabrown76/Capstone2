import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Context } from "./Context";
import NewEatsApi from '../Api';

export const APIContext = createContext();

/**
 * APIContextProvider component that provides API-related state and context to its children.
 * It handles recipe fetching, modal visibility, and selected health options.
 * 
 * @component
 * @example
 * return (
 *   <APIContextProvider>
 *     <App />
 *   </APIContextProvider>
 * )
 */
export const APIContextProvider = ({ children }) => {
    const baseUrl = 'https://api.edamam.com/api/recipes/v2';
    const appId = process.env.REACT_APP_APP_ID;
    const appKey = process.env.REACT_APP_APP_KEY;
    const [recipeData, setRecipeData] = useState(null);
    const [queryTerm, setQueryTerm] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [tooManyFilters, setTooManyFilters] = useState(false);
    const {setIsLoading} = useContext(Context);
    const navigate = useNavigate();

    /**
   * Closes the modal and resets query term and selected options.
   */
    const closeModal = () => {
      setIsModalVisible(false);
      setQueryTerm('');
      setSelectedOptions([]);
    } 

    /**
   * Fetches a recipe from the Edamam API based on the query term and selected options.
   * 
   * @param {string} [cuisineType] - The type of cuisine to filter the recipes by.
   * @returns {Promise} - A promise that resolves to the API response.
   */
    const fetchRecipe = (cuisineType) => {
      let url = `${baseUrl}?type=public&q=${encodeURIComponent(queryTerm)}&app_id=${appId}&app_key=${appKey}`;

      if (cuisineType !== undefined && cuisineType !== '') {
        url += `&cuisineType=${encodeURI(cuisineType)}`;
      }

      if (selectedOptions.length > 0) {
        const optionsString = selectedOptions.map(option => `&health=${option}`).join('');
        url += optionsString;
      }

      url += `&random=true`;

      return axios.get(url);
    }

    /**
   * Checks the validity of a recipe URL and retries if necessary.
   * 
   * @param {string} url - The URL of the recipe to check.
   * @param {string} cuisineType - The type of cuisine to filter the recipes by.
   * @param {number} retryCount - The current retry count.
   */
    const checkUrlAndRetry = (url, cuisineType, retryCount) => {
      NewEatsApi.checkRecipeUrl({ url })
        .then(status => {
          if (status === 200) {
            setIsLoading(false);
            setIsModalVisible(true);
          } else {
            handleRetry(cuisineType, retryCount);
          }
        })
        .catch(err => {
          console.error(`Error in API test: ${err}`);
          handleRetry(cuisineType, retryCount);
        });
    }

    /**
   * Handles retry logic for fetching a valid recipe URL.
   * 
   * @param {string} cuisineType - The type of cuisine to filter the recipes by.
   * @param {number} retryCount - The current retry count.
   */
    const handleRetry = (cuisineType, retryCount) => {
      if (retryCount < 5) {
        apiCall(cuisineType, retryCount + 1);
      } else {
        console.error('Failed to find a valid URL after multiple attempts.');
        setIsLoading(false);
        navigate("/NotFound");
      }
    }

    /**
   * Initiates an API call to fetch recipes and handles the response.
   * 
   * @param {string} cuisineType - The type of cuisine to filter the recipes by.
   * @param {number} [retryCount=0] - The current retry count.
   */
    const apiCall = (cuisineType, retryCount = 0) => {
      setIsLoading(true);
      fetchRecipe(cuisineType)
        .then(res => {
          setTooManyFilters(false);
          const countFromApi = res.data.count ? res.data.count : 0;
          if (countFromApi === 0) setTooManyFilters(true);
          const maxIndex = countFromApi > 0 && countFromApi < 20 ? countFromApi : 20;
          const apiIndex = Math.floor(Math.random() * maxIndex);

          const recipe = res.data.hits[apiIndex].recipe;
          const recipeData = {
            label: recipe.label,
            image: recipe.image,
            ingredients: recipe.ingredients.map(i => i.text),
            uri: recipe.uri,
            url: recipe.url
          }
          setRecipeData(recipeData);

          const { url } = recipe;
          checkUrlAndRetry(url, cuisineType, retryCount);
        })
        .catch(error => {
          console.error(`Error fetching data: `, error);
          navigate("/NotFound");
        });
    }

    /**
   * Handles changes to the selected health options.
   * 
   * @param {string} option - The selected health option.
   */
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
        <APIContext.Provider value={{ 
            recipeData,
            queryTerm,
            setQueryTerm,
            isModalVisible,
            closeModal,
            apiCall,
            handleCheckboxChange,
            selectedOptions,
            tooManyFilters,
        }}>
            {children}
        </APIContext.Provider>
    );
};
