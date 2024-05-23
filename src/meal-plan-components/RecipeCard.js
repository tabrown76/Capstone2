import React, { useContext } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MealContext } from '../contexts/MealContext';
import "../styles/RecipeCard.css";

/**
 * RecipeCard component that renders an individual recipe card.
 * It supports drag-and-drop functionality using DnD Kit.
 * 
 * @component
 * @param {Object} props - The props object.
 * @param {Object} props.recipe - The recipe data.
 * @param {string} props.id - The unique identifier for the recipe.
 * @example
 * return (
 *   <RecipeCard recipe={recipe} id={recipe.id} />
 * )
 */
const RecipeCard = ({ recipe, id }) => {
  const {attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({id});
  const {handleClick} = useContext(MealContext);

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    pointerEvents: isDragging ? 'none' : 'auto'
  }

  /**
   * Handles the click event on the close icon to delete the recipe.
   * 
   * @param {Object} e - The event object.
   */
  const handleIconClick = (e) => {
    e.stopPropagation();
    handleClick(recipe.id);
  };

  return (
    <>
      <li
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        className="recipe-card"
        data-sortable-container-id="recipes"
        data-sortable-id={id}
        data-recipe={JSON.stringify(recipe)}
      >
        <div className="close-icon" onClick={handleIconClick}>&times;</div>
        <h3>{recipe.label}</h3>
        <img src={recipe.image} alt={recipe.label} />
      </li>
    </>
  );
};

export default RecipeCard;
