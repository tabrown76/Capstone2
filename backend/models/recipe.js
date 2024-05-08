"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");

/** Related functions for recipes. */

class Recipe {
  /** Create a recipe (from data), update db, return new recipe data.
   *
   * data should be { uri, label, image, ingredients, url }
   *
   * Returns { label, image, ingredients, url }
   *
   * Throws BadRequestError if recipe already in database.
   * */

  static async create({ uri, label, image, ingredients, url }) {
    const duplicateCheck = await db.query(
          `SELECT uri
           FROM recipes
           WHERE uri = $1`,
        [uri]);

    if (duplicateCheck.rows[0])
      throw new BadRequestError(`Duplicate recipe: ${uri}`);

    const result = await db.query(
          `INSERT INTO recipes
           (uri, label, image, ingredients, url)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING label, image, ingredients, url"`,
        [
          uri,
          label,
          image,
          ingredients,
          url
        ],
    );
    const recipe = result.rows[0];

    return recipe;
  }

  /** Given a recipe uri, return data about recipe.
   *
   * Returns { label, image, ingredients, url }
   *
   * Throws NotFoundError if not found.
   **/

  static async get(uri) {
    const recipeRes = await db.query(
          `SELECT label,
                  image,
                  ingredients,
                  url
           FROM recipes
           WHERE uri = $1`,
        [uri]);

    const recipe = recipeRes.rows[0];

    if (!recipe) throw new NotFoundError(`No recipe: ${uri}`);

    return recipe;
  }

  /** Delete given recipe from database; returns undefined.
   *
   * Throws NotFoundError if recipe not found.
   **/

  static async remove(uri) {
    const result = await db.query(
          `DELETE
           FROM recipes
           WHERE uri = $1
           RETURNING uri`,
        [uri]);
    const recipe = result.rows[0];

    if (!recipe) throw new NotFoundError(`No recipe: ${uri}`);
  }
}


module.exports = Recipe;
