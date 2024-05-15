"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

/** Related functions for users. */

class User {
  /** authenticate user with username, password.
   *
   * Returns { user_id, username, first_name, last_name, email }
   *
   * Throws UnauthorizedError is user not found or wrong password.
   **/

  static async authenticate(username, password) {
    // try to find the user first
    const result = await db.query(
          `SELECT user_id,
                  username,
                  password,
                  first_name AS "firstName",
                  last_name AS "lastName",
                  email
           FROM users
           WHERE username = $1`,
        [username],
    );

    const user = result.rows[0];

    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        delete user.password;
        return user;
      }
    }

    throw new UnauthorizedError("Invalid username/password");
  }

  /**
   * Authenticate user with Google ID.
   *
   * Returns { user_id, username, firstName, lastName, email }
   *
   * Throws UnauthorizedError if user not found.
   **/
  static async authenticateWithGoogle(googleId) {
    // Try to find the user by Google ID
    const result = await db.query(
          `SELECT user_id,
                  username,
                  first_name AS "firstName",
                  last_name AS "lastName",
                  email
           FROM users
           WHERE google_id = $1`,
        [googleId],
    );

    const user = result.rows[0];

    if (user) {
      return user;
    }

    throw new UnauthorizedError("Invalid Google ID");
  }


  /** Register user with data.
   *
   * Returns { username, firstName, lastName, email }
   *
   * Throws BadRequestError on duplicates.
   **/

  static async register(
      { username, password, firstName, lastName, email }) {
    const duplicateCheck = await db.query(
          `SELECT username
           FROM users
           WHERE username = $1`,
        [username],
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate username: ${username}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
          `INSERT INTO users
           (username,
            password,
            first_name,
            last_name,
            email)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING username, first_name AS "firstName", last_name AS "lastName", email`,
        [
          username,
          hashedPassword,
          firstName,
          lastName,
          email
        ],
    );

    const user = result.rows[0];

    return user;
  }

  /** Register user with data.
   *
   * Returns { username, firstName, lastName, email, googleId }
   *
   * Throws BadRequestError on duplicates.
   **/

  static async googleRegister(
      { firstName, lastName, email, googleId }) {
    const duplicateCheck = await db.query(
          `SELECT google_id
           FROM users
           WHERE google_id = $1`,
        [googleId],
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate registration: ${googleId}`);
    }

    const result = await db.query(
          `INSERT INTO users
           (first_name,
            last_name,
            email,
            google_id)
           VALUES ($1, $2, $3, $4)
           RETURNING first_name AS "firstName", last_name AS "lastName", email, google_id AS "googleId"`,
        [
          firstName,
          lastName,
          email,
          googleId
        ],
    );

    const user = result.rows[0];

    return user;
  }

  /** Find all users.
   *
   * Returns [{ user_id, first_name, last_name, email }, ...]
   **/

  static async findAll() {
    const result = await db.query(
          `SELECT user_id,
                  first_name AS "firstName",
                  last_name AS "lastName",
                  email
           FROM users
           ORDER BY user_id`,
    );

    return result.rows;
  }

  /** Given a user_id, return data about user.
   *
   * Returns { user_id, username, first_name, last_name, email  }
   *
   * Throws NotFoundError if user not found.
   **/

  static async get(user_id) {
    const userRes = await db.query(
          `SELECT user_id,
                  username,
                  first_name AS "firstName",
                  last_name AS "lastName",
                  email
           FROM users
           WHERE user_id = $1`,
        [user_id],
    );

    const user = userRes.rows[0];

    if (!user) throw new NotFoundError(`No user: ${user_id}`);

    return user;
  }

  /** Update user data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Data can include:
   *   { firstName, lastName, password, email }
   *
   * Returns { username, firstName, lastName, email }
   *
   * Throws NotFoundError if not found.
   *
   * WARNING: this function can set a new password.
   * Callers of this function must be certain they have validated inputs to this
   * or a serious security risks are opened.
   */

  static async update(user_id, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    }

    const { setCols, values } = sqlForPartialUpdate(
        data,
        {
          firstName: "first_name",
          lastName: "last_name"
        });
    const useridVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE users 
                      SET ${setCols} 
                      WHERE username = ${useridVarIdx} 
                      RETURNING user_id,
                                first_name AS "firstName",
                                last_name AS "lastName",
                                email`;
    const result = await db.query(querySql, [...values, user_id]);
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${user_id}`);

    delete user.password;
    return user;
  }

  /** Delete given user from database; returns undefined. */

  static async remove(user_id) {
    let result = await db.query(
          `DELETE
           FROM users
           WHERE user_id = $1
           RETURNING user_id`,
        [username],
    );
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${user_id}`);
  }
}

module.exports = User;
