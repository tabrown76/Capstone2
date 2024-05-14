"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");

/** Related functions for recipes. */

class Recipe {
  /** Create a recipe (from data), update db, return new recipe data.
   *
   * Data should be { recipe_id, label, image, ingredients, url }
   *
   * Returns { label, image, ingredients, url }
   *
   * Throws BadRequestError if recipe already in database.
   * */

  static async createRecipe({ recipe_id, label, image, ingredients, url }) {
    const duplicateCheck = await db.query(
          `SELECT recipe_id
           FROM recipes
           WHERE recipe_id = $1`,
        [recipe_id]);

    if (duplicateCheck.rows[0])
      throw new BadRequestError(`Duplicate recipe: ${recipe_id}`);

    const result = await db.query(
          `INSERT INTO recipes
           (recipe_id, label, image, ingredients, url)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING label, image, ingredients, url"`,
        [
          recipe_id,
          label,
          image,
          ingredients,
          url
        ],
    );
    const recipe = result.rows[0];

    return recipe;
  }

  /** Given a recipe_id, return data about recipe.
   *
   * Returns { label, image, ingredients, url }
   *
   * Throws NotFoundError if not found.
   **/

  static async getRecipe(recipe_id) {
    const recipeRes = await db.query(
          `SELECT label,
                  image,
                  ingredients,
                  url
           FROM recipes
           WHERE recipe_id = $1`,
        [recipe_id]);

    const recipe = recipeRes.rows[0];

    if (!recipe) throw new NotFoundError(`No recipe: ${recipe_id}`);

    return recipe;
  }
}


module.exports = Recipe;
