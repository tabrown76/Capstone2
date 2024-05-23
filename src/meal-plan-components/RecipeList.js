import React from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
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
const RecipeList = ({recipeList}) => {
  const items = recipeList.map(item => ({ id: item.id, containerId: 'recipes' }));

  return (
    <ul className="recipe-list" >
      <SortableContext items={items} strategy={verticalListSortingStrategy} id='recipes'>
        {recipeList && recipeList.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} id={recipe.id} />
        ))} 
      </SortableContext>
    </ul>
  )
}

export default RecipeList;
