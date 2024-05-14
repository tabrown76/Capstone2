import axios from "axios";
// import { jwtDecode } from "jwt-decode";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001"; 

export default class NewEatsApi {
  static token;
  
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);
    console.debug("Sending with token:", NewEatsApi.token);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${NewEatsApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.message);
      let message = err.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Register a user. */
  static async registerUser(data){
    let res = await this.request(`auth/register`, data, "post");
    localStorage.setItem('token', res.token);
    NewEatsApi.token = res.token;
    return res.token;
  }

  /** Regist a user with Google. */
  static async googleRegister(data){
    let res = await this.request(`auth/googleregister`, data, "post");
    localStorage.setItem('token', res.token);
    NewEatsApi.token = res.token;
    return res.token;
  }

  /** Login validated user. */
  static async loginUser(data){
    let res = await this.request(`auth/token`, data, "post");
    localStorage.setItem('token', res.token);
    NewEatsApi.token = res.token;
    return res.token;
  }

  /** Get user info */
  static async getUser(user_id){
    let res = await this.request(`users/${user_id}`);
    return res.user;
  }

  /** Update user profile */
  static async patchUser(user_id, data){
    let res = await this.request(`users/${user_id}`, data, "patch");
    return res.user;
  }

  /** Delete user profile */
  static async deleteUser(user_id){
    let res = await this.request(`users/${user_id}`, "delete");
    return res.deleted;
  }

  /** Get all recipes for user */
  static async getUsersRecipes(user_id){
    let res = await this.request(`recipes/${user_id}`);
    return res.recipes;
  }

  /** Get recipe for user */
  static async getUserRecipe(user_id, recipe_id){
    let res = await this.request(`recipes/${user_id}/${recipe_id}`);
    return res.recipe;
  }

  /** Associate user and recipe */
  static async postRecipeUser(user_id, recipe_id, data){
    let res = await this.request(`recipes/${user_id}/${recipe_id}`, data, "post");
    return res.recipe;
  }

  /** Unassociate user and recipe */
  static async deleteRecipeUser(user_id, recipe_id){
    let res = await this.request(`recipes/${user_id}/${recipe_id}`, "delete");
    return res.deleted;
  }

  /** Get shopping list for user */
  static async getShoppingList(user_id){
    let res = await this.request(`shopping/${user_id}`);
    return res.list;
  }

  /** Create shopping list for user */
  static async createShoppingList(user_id, data){
    let res = await this.request(`shopping/${user_id}`, data, "post");
    return res.list;
  }

  /** Update shopping list for user */
  static async updateShoppingList(user_id, data){
    let res = await this.request(`shopping/${user_id}`, data, "patch");
    return res.list;
  }
}

NewEatsApi.token = localStorage.getItem('token');
