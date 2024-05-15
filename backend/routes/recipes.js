"use strict";

/** Routes for shopping lists. */

const jsonschema = require("jsonschema");
const express = require("express");
const axios = require("axios");
const { ensureCorrectUser } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const Recipe = require("../models/recipe");
const RecipesUsers = require("../models/recipes-users");
const router = express.Router();

/**
 * GET route to check the accessibility of a URL.
 * Expects a URL as a query parameter and checks if it is reachable.
 * @param {string} url - The URL to check, provided as a query parameter.
 * @return {object} - Returns an object with the status of the check and any relevant HTTP status code.
 */
router.get('/check-url', async (req, res) => {
  const url = req.query.url;
  if (!url) {
      throw new BadRequestError('URL parameter is required.');
  }
  try {
      await axios.head(url);
      res.sendStatus(200);
  } catch (error) {
    console.error(`Error checking URL: ${error.message}`);
    res.status(500).send({ status: 'URL is not working', error: error.message });
  }
})

/**
 * GET /:user_id => { recipes }
 *
 * Returns all recipes associated with user_id.
 *
 * Authorization required: Must be the same user as :user_id
 */
router.get("/:user_id", ensureCorrectUser, async function (req, res, next) {
  try {
    const userId = parseInt(req.params.user_id);

    // Validate user ID is a number
    if (isNaN(userId)) {
      throw new BadRequestError("Invalid user ID.");
    }

    // Retrieve recipes using the user_id
    const recipes = await RecipesUsers.findAll(req.params.user_id);

    // Return the list as a JSON array
    return res.json({ recipes });
  } catch (err) {
    return next(err);
  }
})

/**
 * GET /:user_id/:recipe_id => { recipe }
 *
 * Returns the recipe data specified by recipe_id.
 *
 * Authorization required: Must be the same user as :user_id
 */
router.get("/:user_id/:recipe_id", ensureCorrectUser, async function (req, res, next) {
  try {
    const userId = parseInt(req.params.user_id);

    // Validate user ID is a number
    if (isNaN(userId)) {
      throw new BadRequestError("Invalid user ID.");
    }

    // Retrieve the recipe using the recipe_id
    const recipe = await Recipe.getRecipe(req.params.recipe_id);

    // Return the list as a JSON array
    return res.json({ recipe });
  } catch (err) {
    return next(err);
  }
})

/** POST /:user_id/:recipe_id => { recipe }
 *
 * Adds the recipe to recipes_users
 *
 * Authorization required: Must be the same user as :user_id
 **/

router.post("/:user_id/:recipe_id", ensureCorrectUser, async function (req, res, next) {
  try {
    const userId = parseInt(req.params.user_id);

    // Validate user ID is a number
    if (isNaN(userId)) {
      throw new BadRequestError("Invalid user ID.");
    }
    console.log(`recipe data: ${JSON.stringify(req.body)}`)
    const createRecipePromise = Recipe.createRecipe(req.body);
    const addToUserPromise = RecipesUsers.addToUser(req.params.recipe_id, userId);

    const [recipe, relationship] = await Promise.all([createRecipePromise, addToUserPromise]);

    return res.json({ recipe });
  } catch (err) {
    return next(err);
  }
})

/** Delete /:user_id/:recipe_id => { deleted: recipe_id }
 *
 * Removes the recipe from recipes_users
 *
 * Authorization required: Must be the same user as :user_id
 **/

router.delete("/:user_id/:recipe_id", ensureCorrectUser, async function (req, res, next) {
  try {
    const userId = parseInt(req.params.user_id);

    // Validate user ID is a number
    if (isNaN(userId)) {
      throw new BadRequestError("Invalid user ID.");
    }

    await RecipesUsers.removeFromUser(req.params.recipe_id, userId);
    return res.json({ deleted: req.params.recipe_id });
  } catch (err) {
    return next(err);
  }
})

module.exports = router;