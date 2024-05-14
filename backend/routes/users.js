"use strict";

/** Routes for users. */

const jsonschema = require("jsonschema");

const express = require("express");
const { ensureCorrectUser } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const User = require("../models/user");
const userUpdateSchema = require("../schemas/userUpdate.json");

const router = express.Router();


/** GET /[user_id] => { user }
 *
 * Returns { user_id, username, firstName, lastName, email }
 *
 * Authorization required: same user-as-:user_id
 **/

router.get("/:user_id", ensureCorrectUser, async function (req, res, next) {
  try {
    const user = await User.get(req.params.user_id);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});


/** PATCH /[user_id] { user } => { user }
 *
 * Data can include:
 *   { firstName, lastName, password }
 *
 * Returns { user_id, firstName, lastName, email }
 *
 * Authorization required: same-user-as-:user_id
 **/

router.patch("/:user_id", ensureCorrectUser, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const user = await User.update(req.params.user_id, req.body);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});


/** DELETE /[user_id]  =>  { deleted: user_id }
 *
 * Authorization required: same-user-as-:user_id
 **/

router.delete("/:user_id", ensureCorrectUser, async function (req, res, next) {
  try {
    await User.remove(req.params.user_id);
    return res.json({ deleted: req.params.user_id });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
