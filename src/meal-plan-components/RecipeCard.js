import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import "../styles/RecipeCard.css";

const RecipeCard = ({ recipe, index }) => {
  return (
    <Draggable key={recipe.id} draggableId={recipe.id} index={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="recipe-card"
        >
          <h3>{recipe.label}</h3>
          <img src={recipe.image} alt={recipe.label} />
        </li>
      )}
    </Draggable>
  );
};

export default RecipeCard;
