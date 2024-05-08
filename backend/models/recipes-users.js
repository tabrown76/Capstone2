"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");

class RecipesUsers {
  /** Associate a recipe with a user.
   *
   * Requires uri of the recipe and user_id.
   *
   * Throws BadRequestError if the relationship already exists.
   **/
  static async addToUser({ uri, user_id }) {
    // Check for existing relationship
    const duplicateCheck = await db.query(
      `SELECT 1 FROM recipes_users
       WHERE recipe_uri = $1 AND user_id = $2`,
      [uri, user_id]
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`This user already has this recipe saved: ${uri}`);
    }

    // Add relationship
    const result = await db.query(
      `INSERT INTO recipes_users (recipe_uri, user_id)
       VALUES ($1, $2)
       RETURNING recipe_uri, user_id`,
      [uri, user_id]
    );

    return result.rows[0];
  }

  /** Remove association of a recipe to a user; returns undefined.
   *
   * Requires uri of the recipe and user_id.
   *
   * Throws NotFoundError if recipe-user relationship not found.
   **/
  static async removeFromUser({ uri, user_id }) {
    const result = await db.query(
      `DELETE FROM recipes_users
       WHERE recipe_uri = $1 AND user_id = $2
       RETURNING recipe_uri`,
      [uri, user_id]
    );

    const relationship = result.rows[0];

    if (!relationship) {
      throw new NotFoundError(`No recipe-user relationship: ${uri} for user ${user_id}`);
    }
  }
}

module.exports = RecipesUsers;
