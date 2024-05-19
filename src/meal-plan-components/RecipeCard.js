import React, { useContext } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MealContext } from '../contexts/MealContext';
import "../styles/RecipeCard.css";

const RecipeCard = ({ recipe, id }) => {
  const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({id});
  const {handleClick} = useContext(MealContext);

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
    // pointerEvents: isDragging ? 'none' : 'auto'
  }

  const handleIconClick = () => {
    console.log('Close icon clicked', recipe.id);
    if(!isDragging){
      handleClick(recipe.id);
    }
  };

  return (
    <>
      <li
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        className="recipe-card"
      >
        <div className="close-icon" onClick={handleIconClick}>&times;</div>
        <h3>{recipe.label}</h3>
        <img src={recipe.image} alt={recipe.label} />
      </li>
    </>
  );
};

export default RecipeCard;
