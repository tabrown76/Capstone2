import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Context } from './Context';
import NewEatsApi from '../Api';

export const MealContext = createContext();

/**
 * MealContextProvider component that provides meal planning state and context to its children.
 * It handles fetching recipes and generating dates for the current week.
 * 
 * @component
 * @example
 * return (
 *   <MealContextProvider>
 *     <App />
 *   </MealContextProvider>
 * )
 */
export const MealContextProvider = ({ children }) => {
    const { user, setIsLoading } = useContext(Context);
    const [recipeList, setRecipeList] = useState([]);
    const [weekList, setWeekList] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const fetchRecipes = async () => {
            setIsLoading(true);
            try {
                const recipes = await NewEatsApi.getUserRecipes(user.user_id);
                
                setRecipeList(recipes);
            } catch (error) {
                console.error("Failed to fetch recipes:", error);
                setRecipeList([]);
            } finally {
                setIsLoading(false);
            }
        };

        if (user && location.pathname === `/${user.user_id}/mealplan`) {
            fetchRecipes();
        }
    }, [location.pathname, user, setIsLoading])

    /**
   * Generates an array of dates for the current week starting from the given date.
   * 
   * @param {Date} startDate - The start date for generating the week's dates.
   * @returns {Array} - An array of date objects for the current week.
   */
    const getWeekDates = (startDate) => {
      const dates = [];
      for (let i = 0; i < 7; i++) {
        let date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        date = {
          date: date.toDateString(),
          day: date.toLocaleDateString('en-US', { weekday: 'long' }),
          id: date.getTime().toString()
        }
        dates.push(date);
      }
      return dates;
    }

    // Generate dates for the current week
    useEffect(() => {
        const currentDate = new Date();
        const weekDates = getWeekDates(currentDate);

        if(location.pathname === `/${user.user_id}/mealplan`){
            setWeekList(weekDates);
        }
    }, [location.pathname, user])

    const value = useMemo(() => ({
        recipeList,
        setRecipeList,
        weekList,
        setWeekList
    }), [recipeList, weekList])

    /**
   * Handles the click event to delete a recipe for the user.
   * 
   * @async
   * @param {string} recipeId - The ID of the recipe to delete.
   */
    const handleClick = async(recipeId) => {
        try{
          await NewEatsApi.deleteRecipeUser(user.user_id, recipeId);
          setRecipeList((prevRecipes) => prevRecipes.filter(recipe => recipe.id !== recipeId));
        } catch(e){
          console.error(`Error removing recipe: ${e}`)
        }
    }

    return (
        <MealContext.Provider value={{ 
            value,
            handleClick
        }}>
            {children}
        </MealContext.Provider>
    );
};
