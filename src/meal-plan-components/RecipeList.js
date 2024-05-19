import React, { useContext } from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { MealContext } from '../contexts/MealContext';
import RecipeCard from './RecipeCard';

const RecipeList = () => {
  const { value } = useContext(MealContext);
  const {recipeList} = value;

  return (
    <ul className="recipe-list" >
      <SortableContext items={recipeList.map(recipe => recipe.id)} strategy={verticalListSortingStrategy}>
        {recipeList && recipeList.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} id={recipe.id} />
        ))} 
      </SortableContext>
    </ul>
  )
}

export default RecipeList;
