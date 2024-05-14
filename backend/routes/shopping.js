"use strict";

/** Routes for shopping lists. */

const jsonschema = require("jsonschema");
const express = require("express");
const { ensureCorrectUser } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const ShoppingList = require("../models/shopping-list");
const shoppingSchema = require("../schemas/shopping.json");
const router = express.Router();

/**
 * GET /:user_id => { list }
 *
 * Returns the shopping list of the user specified by user_id.
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

    // Retrieve the shopping list using the user ID
    const list = await ShoppingList.getUserShoppingList(userId);

    // Ensure the list is an array (important if no ingredients are found)
    if (!Array.isArray(list)) {
      return res.status(500).json({ error: "Failed to retrieve shopping list." });
    }

    // Return the list as a JSON array
    return res.json({ list });
  } catch (err) {
    return next(err);
  }
})

/** POST /:user_id => { list }
 *
 * Creates the shopping list of the user specified by user_id with the provided list items.
 * Expected req.body format: { ingredients: ["apple", "banana", "carrot"] }
 *
 * Authorization required: Must be the same user as :user_id
 **/

router.post("/:user_id", ensureCorrectUser, async function (req, res, next) {
  try {
    const userId = parseInt(req.params.user_id);

    // Validate user ID is a number
    if (isNaN(userId)) {
      throw new BadRequestError("Invalid user ID.");
    }

    const validator = jsonschema.validate(req.body, shoppingSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const list = await ShoppingList.addRecipeIngredients(userId, req.body.ingredients);
    return res.json({ list });
  } catch (err) {
    return next(err);
  }
})

/** PATCH /:user_id => { list }
 *
 * Updates the shopping list of the user specified by user_id with the provided list items.
 * Expected req.body format: { ingredients: ["apple", "banana", "carrot"] }
 *
 * Authorization required: Must be the same user as :user_id
 **/

router.patch("/:user_id", ensureCorrectUser, async function (req, res, next) {
  try {
    const userId = parseInt(req.params.user_id);

    // Validate user ID is a number
    if (isNaN(userId)) {
      throw new BadRequestError("Invalid user ID.");
    }

    const validator = jsonschema.validate(req.body, shoppingSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const list = await ShoppingList.updateList(userId, req.body.ingredients);
    return res.json({ list });
  } catch (err) {
    return next(err);
  }
})

module.exports = router;