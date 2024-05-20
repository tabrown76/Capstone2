const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");

class ShoppingList {
    /**
   * Add ingredients from a recipe to the user's shopping list.
   * 
   * @param {number} user_id - The ID of the user.
   * @param {string} recipe_id - The URI of the recipe.
   * @returns {Promise<string[]>} The updated shopping list for the user.
   * @throws {NotFoundError} If the recipe is not found.
   */
    static async addRecipeIngredients(user_id, recipe_id) {
        // Retrieve the recipe's ingredients
        const recipeRes = await db.query(
            `SELECT ingredients
             FROM recipes
             WHERE recipe_id = $1`,
            [recipe_id]
        );

        const recipe = recipeRes.rows[0];
        if (!recipe) throw new NotFoundError(`No recipe found with URI: ${recipe_id}`);

        // Directly use the array of ingredients
        const ingredients = recipe.ingredients;

        // Insert the array of ingredients
        await db.query(
            `INSERT INTO shopping_list (user_id, ingredients)
             VALUES ($1, $2)
             ON CONFLICT (user_id) DO UPDATE SET ingredients = shopping_list.ingredients || $2
             WHERE NOT ($2 <@ shopping_list.ingredients)`,  // Append new ingredients not already in the list
            [user_id, ingredients]
        );
    
        return this.getUserShoppingList(user_id);
    }

    /**
   * Update the shopping list of a user by replacing it with a new list of ingredients.
   * 
   * @param {number} user_id - The ID of the user.
   * @param {string[]} ingredients - An array of the text of the ingredients to set as the new list.
   * @returns {Promise<{message: string}>} A confirmation message.
   */
    static async updateList(user_id, ingredients) {
        await db.query(
            `INSERT INTO shopping_list (user_id, ingredients)
             VALUES ($1, $2)
             ON CONFLICT (user_id) DO UPDATE
             SET ingredients = $2`,
            [user_id, ingredients]
        );

        return { message: "Shopping list updated successfully." };
    }

    /**
   * Retrieve the shopping list for a specific user.
   * 
   * @param {number} user_id - The ID of the user.
   * @returns {Promise<string[]>} The user's shopping list as an array of ingredients.
   */
    static async getUserShoppingList(user_id) {
        const result = await db.query(
            `SELECT ingredients
             FROM shopping_list
             WHERE user_id = $1`,
            [user_id]
        );

        if (result.rows.length > 0) {
            return result.rows[0].ingredients;
        } else {
            return [];
        }
    }
}

module.exports = ShoppingList;
