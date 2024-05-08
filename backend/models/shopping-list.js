const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");

class ShoppingList {
    /**
     * Add ingredients from a specific recipe to the shopping list for a user.
     * 
     * @param {integer} user_id - The ID of the user.
     * @param {string} uri - The URI of the recipe.
     * @returns The updated shopping list for the user.
     */
    static async addRecipeIngredients(user_id, uri) {
        // Retrieve the recipe's ingredients
        const recipeRes = await db.query(
            `SELECT ingredients
             FROM recipes
             WHERE uri = $1`,
            [uri]
        );

        const recipe = recipeRes.rows[0];
        if (!recipe) throw new NotFoundError(`No recipe found with URI: ${uri}`);

        // Assume ingredients are stored as a JSON string
        const ingredients = JSON.parse(recipe.ingredients);

        // Insert each ingredient into the shopping list
        ingredients.forEach(async ingredient => {
            await db.query(
                `INSERT INTO shopping_list (user_id, ingredient_text)
                 VALUES ($1, $2)
                 ON CONFLICT (user_id, ingredient_text) DO NOTHING`, // Avoid duplicates
                [user_id, ingredient]
            );
        });

        return this.getUserShoppingList(user_id);
    }

    /**
     * Remove a specific ingredient from the shopping list of a user.
     * 
     * @param {integer} user_id - The ID of the user.
     * @param {string} ingredient_text - The text of the ingredient to remove.
     * @returns A confirmation message.
     */
    static async removeIngredient(user_id, ingredient) {
        const result = await db.query(
            `DELETE FROM shopping_list
             WHERE user_id = $1 AND ingredient = $2
             RETURNING ingredient`,
            [user_id, ingredient]
        );

        if (!result.rows[0]) throw new NotFoundError(`Ingredient not found in shopping list: ${ingredient}`);

        return { message: "Ingredient removed from shopping list." };
    }

    /**
     * Retrieve the shopping list for a specific user.
     * 
     * @param {integer} user_id - The ID of the user.
     * @returns The user's shopping list.
     */
    static async getUserShoppingList(user_id) {
        const results = await db.query(
            `SELECT ingredient_text
             FROM shopping_list
             WHERE user_id = $1`,
            [user_id]
        );

        return results.rows.map(row => row.ingredient);
    }
}

module.exports = ShoppingList;
