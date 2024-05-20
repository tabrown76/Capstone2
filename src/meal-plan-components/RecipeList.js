import React, { useContext } from 'react';
import { MealContext } from '../contexts/MealContext';
import RecipeCard from './RecipeCard';

/**
 * RecipeList component that renders a list of RecipeCard components.
 * It gets the recipe list from the MealContext.
 * 
 * @component
 * @example
 * return (
 *   <RecipeList />
 * )
 */
const RecipeList = () => {
  const { value } = useContext(MealContext);
  const {recipeList} = value;

  return (
    <ul className="recipe-list" >
        {recipeList && recipeList.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} id={recipe.id} />
        ))} 
    </ul>
  )
}

export default RecipeList;
