import React, { useContext, useEffect, useRef } from "react";
import { Button } from "reactstrap";
import { Context } from "../contexts/Context";
import { APIContext } from "../contexts/APIContext";
import NewEatsApi from "../Api";
import "../styles/RecipeModal.css";

/**
 * RecipeModal component that displays a modal with recipe details.
 * It allows users to view recipe ingredients, add the recipe to their meal plan, or fetch the next recipe.
 * 
 * @component
 * @example
 * return (
 *   <RecipeModal />
 * )
 */
const RecipeModal = () => {
    const { user } = useContext(Context);
    const { apiCall, recipeData, closeModal } = useContext(APIContext);
    const modalContentRef = useRef(null);

    /**
   * Handles keydown events to close the modal on "Escape" key press.
   * 
   * @param {Object} e - The event object.
   */
    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            closeModal();
        }
    }

    // Add event listener for keydown when component mounts and remove on unmount
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    })

    /**
   * Resets the modal content scroll position to the top.
   */
    const modalReset = () => {
        if (modalContentRef.current) {
            modalContentRef.current.scrollTop = 0;
        }
    }

    /**
   * Fetches the next recipe and resets the modal content.
   */
    const handleNext = () => {
        apiCall();
        modalReset();
    }   
    
    /**
   * Adds the current recipe to the user's meal plan.
   */
    const handleAdd = () => {
        const { uri } = recipeData;
        const recipeId = uri.match(/recipe_(.+)/)[1];
        const withRecipeId = {...recipeData, recipe_id: recipeId}

        NewEatsApi.postRecipeUser(user.user_id, recipeId, withRecipeId);
        modalReset();
    }

    /**
   * Prevents modal content click from closing the modal.
   * 
   * @param {Object} e - The event object.
   */
    const stopPropagation = (e) => e.stopPropagation();

    return (
      <div className="recipe-modal-backdrop" onClick={closeModal}>
        <div className="recipe-modal-content" onClick={stopPropagation} ref={modalContentRef}> 
            <div className="close-icon" onClick={closeModal}>&times;</div>
            <h2>{recipeData.label}</h2>
            <img src={recipeData.image} alt={recipeData.label} />
            <div>Ingredients: 
                <ul>
                    {recipeData.ingredients.map((ingredientObject, index) =>
                        <li key={index}>
                            {ingredientObject}
                        </li>
                    )}
                </ul>
            </div>
            <a href={recipeData.url} target="_blank" rel="noopener noreferrer" className="Button btn btn-secondary">
                Make This!
            </a>
            {user?.firstName && <Button className="Button" onClick={handleAdd}>Add to Meal Plan</Button>}
            <Button className="Button" onClick={handleNext}>Next</Button>
        </div>
      </div>
    );
}

export default RecipeModal;