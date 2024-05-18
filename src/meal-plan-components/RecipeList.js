import React, { useContext } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { MealContext } from '../contexts/MealContext';
import RecipeCard from './RecipeCard';
import "../styles/RecipeList.css";

const RecipeList = () => {
  const { value } = useContext(MealContext);
  const {recipeList} = value;

  return (
    <Droppable droppableId="recipesDroppable">
      {(provided) => (
        <ul className="recipe-list" ref={provided.innerRef} {...provided.droppableProps}>
          {recipeList && recipeList.map((recipe, index) => (
            <RecipeCard key={recipe.id} recipe={recipe} index={index} />
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  )
}

export default RecipeList;
