import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSortable,  } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import { google } from "calendar-link";
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
const RecipeReceiver = ({ id, date }) => {
  const {value} = useContext(MealContext);
  const {dragIds, setDragIds, recipeList, setRecipeList} = value;
  const {attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({id});
  const {userId} = useParams()
  const [googleUrl, setGoogleUrl] = useState(null);
  const [receivedRecipe, setReceivedRecipe] = useState([]);

  useEffect(() => {
    const setData = () => {
      const receivedRecipe = dragIds.find(item => item.id === id);
      setReceivedRecipe(receivedRecipe);
    }
    setData();
  }, [dragIds, id])

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    pointerEvents: isDragging ? 'none' : 'auto'
  }

  const handleClick = () => {
    const ingredients = {
      ingredients: receivedRecipe.recipe.ingredients
    }
    NewEatsApi.createShoppingList(userId, ingredients);
  }

  useEffect(() => {
    if(receivedRecipe && receivedRecipe.recipe){
      const event = {
        title: `${receivedRecipe.recipe.label}`,
        description: `${receivedRecipe.recipe.url}`,
        start: `${date} 18:00:00`,
        duration: [3, 'hour']
      }
      
        setGoogleUrl(google(event)); 
    }
  }, [receivedRecipe, date])

  /**
   * Handles the click event on the close icon to delete the recipe.
   * 
   * @param {Object} e - The event object.
   */
  const handleIconClick = (e, recipe) => {
    e.stopPropagation();

    const updatedDragIds = dragIds.map(item => {
      if (item.id === id) {
        return { id: item.id };
      }
      return item;
    })

    setDragIds(updatedDragIds);
    const updatedRecipeList = [...recipeList, recipe]
    setRecipeList(updatedRecipeList);
  };

  return (
    <>
      <div 
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        className="recipe-receiver"
        data-sortable-container-id="recipe-receiver"
        data-sortable-id={id}
      >
        {receivedRecipe && receivedRecipe.recipe ? (
          <>
            <img src={receivedRecipe.recipe.image} alt={receivedRecipe.recipe.label} />
            <div className="recipe-details">
              <h3>{receivedRecipe.recipe.label}</h3>
              <div className="close-icon" onClick={(e) => handleIconClick(e, receivedRecipe.recipe)}>&times;</div>
              <div className="buttons-container">
              <a 
                href={googleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="Button btn btn-secondary"
              >
                Add to Google Calendar
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
