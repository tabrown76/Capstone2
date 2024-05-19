import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Context } from './Context';
import NewEatsApi from '../Api';

export const MealContext = createContext();

export const MealContextProvider = ({ children }) => {
    const { user, setIsLoading } = useContext(Context);
    const [recipeList, setRecipeList] = useState([]);
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

    const value = useMemo(() => ({
        recipeList,
        setRecipeList
    }), [recipeList])

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
