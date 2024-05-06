import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001"; 
// console.log(REACT_APP_BASE_URL);

export default class NewEatsApi {
  static token;
  
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${NewEatsApi.token}` };
    console.log(`header: ${JSON.stringify(headers)}`)
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
    return res.token;
  }

  /** Login validated user. */
  static async loginUser(data){
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  static async getUser(username){
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Update user profile */
  static async patchUser(username, data){
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }
}

// for now, put token ("testuser" / "password" on class)
NewEatsApi.token = localStorage.getItem('token');