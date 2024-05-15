"use strict";

/** Routes for authentication. */

const jsonschema = require("jsonschema");

const User = require("../models/user");
const express = require("express");
const router = new express.Router();
const { createToken } = require("../helpers/tokens");
const userAuthSchema = require("../schemas/userAuth.json");
const userRegisterSchema = require("../schemas/userRegister.json");
const userGoogleSchema = require("../schemas/userGoogle.json");
const { BadRequestError } = require("../expressError");
const { json } = require("react-router-dom");

/** POST /auth/token:  { (username, password) || googleId } => { token }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */

router.post("/token", async function (req, res, next) {
  try {
    const { username, password, googleId } = req.body;

    // Validate the request body based on the presence of googleId
    const validator = googleId ?
      jsonschema.validate(req.body, userGoogleSchema) :
      jsonschema.validate(req.body, userAuthSchema);

    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    let user;
    if (googleId) {
      user = await User.authenticateWithGoogle(googleId);
    } else {
      user = await User.authenticate(username, password);
    }

    const token = createToken(user);
    return res.json({ token });
  } catch (err) {
    return next(err);
  }
})

/** POST /auth/register:   { user } => { token }
 *
 * user must include { username, password, firstName, lastName, email }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */

router.post("/register", async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userRegisterSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const newUser = await User.register({ ...req.body });
    const token = createToken(newUser);
    return res.status(201).json({ token });
  } catch (err) {
    return next(err);
  }
});

/** POST /auth/googleregister:   { user } => { token }
 *
 * must include { firstName, lastName, email, googleId }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */

router.post("/googleregister", async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userGoogleSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const newUser = await User.googleRegister({ ...req.body });
    const token = createToken(newUser);
    return res.status(201).json({ token });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
