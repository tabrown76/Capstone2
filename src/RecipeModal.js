import React, { useContext, useEffect, useRef } from "react";
import { Button } from "reactstrap";
import { Context } from "./Context";
import { APIContext } from "./APIContext";
import NewEatsApi from "./Api";
import "./styles/RecipeModal.css";

const RecipeModal = () => {
    const { user } = useContext(Context);
    const { apiCall, recipeData, closeModal } = useContext(APIContext);
    const modalContentRef = useRef(null);

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

    const modalReset = () => {
        if (modalContentRef.current) {
            modalContentRef.current.scrollTop = 0;
        }
    }

    const handleNext = () => {
        apiCall();
        modalReset();
    }   
    
    const handleAdd = () => {
        const { uri } = recipeData;
        const recipeId = uri.match(/recipe_(.+)/)[1];
        const withRecipeId = {...recipeData, recipe_id: recipeId}

        NewEatsApi.postRecipeUser(user.user_id, recipeId, withRecipeId);
        modalReset();
    }

    // Prevent modal content click from closing the modal
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
                            {ingredientObject.text}
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