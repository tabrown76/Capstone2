import React from "react";
import { Button } from "reactstrap";
import "../styles/RecipeModal.css";

const RecipeModal = ({recipeData, onClose}) => {
    // if (!recipeData) return null;

    // Prevent modal content click from closing the modal
    const stopPropagation = (e) => e.stopPropagation();

    return (
      <div className="recipe-modal-backdrop" onClick={onClose}>
        <div className="recipe-modal-content" onClick={stopPropagation}>
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
            <Button className="Button">Add to Meal Plan</Button>
            <Button className="Button" onClick={onClose}>Close</Button>
        </div>
      </div>
    );
}

export default RecipeModal;