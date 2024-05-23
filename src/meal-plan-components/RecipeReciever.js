import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { useSortable,  } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import { MealContext } from "../contexts/MealContext";
import { Button } from "reactstrap";
import NewEatsApi from "../Api";
import "../styles/RecipeReceiver.css";

/**
 * RecipeReceiver component that acts as a droppable area for recipes.
 * It uses the DnD Kit's useDroppable hook to enable drag-and-drop functionality.
 * 
 * @component
 * @param {Object} props - The props object.
 * @param {string} props.id - The unique identifier for the droppable area.
 * @example
 * return (
 *   <RecipeReceiver id={id} />
 * )
 */
const RecipeReceiver = ({ id }) => {
  const {value} = useContext(MealContext);
  const {dragIds} = value;
  const {attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({id});
  const {userId} = useParams()

  const receivedRecipe = dragIds.find(item => item.id === id);

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    pointerEvents: isDragging ? 'none' : 'auto'
  }

  const handleMakeThisClick = (event) => {
    event.preventDefault(); 
    window.open(receivedRecipe.recipe.url, '_blank');
  }

  const handleClick = () => {
    NewEatsApi.createShoppingList(userId, receivedRecipe.recipe.ingredients)
  }

  return (
    <>
      <div 
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        className="recipe-receiver draggable"
        data-sortable-container-id="recipe-receiver"
        data-sortable-id={id}
      >
        {receivedRecipe.recipe ? (
          <>
            <img src={receivedRecipe.recipe.image} alt={receivedRecipe.recipe.label} />
            <div className="recipe-details">
              <h3>{receivedRecipe.recipe.label}</h3>
              <div className="buttons-container">
              <a 
                href="#"
                onClick={handleMakeThisClick}
                rel="noopener noreferrer"
                className="Button btn btn-secondary"
              >
                Make This!
              </a>
              <Button className="Button btn btn-secondary" onClick={handleClick}>Add Ingredients to Shopping List</Button>
              </div>
            </div>
          </>
        ) : (
          <p>Drop recipe here</p>
        )}
      </div>
    </>
  );
};

export default RecipeReceiver;
