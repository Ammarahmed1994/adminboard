import axios from "axios";

const API_URl = "45.77.29.107:4200/api/admin";

export class AdminService {
  static async adminLogin(username, password) {
    try {
      const response = await axios({
        method: `POST`,
        url: `${API_URl}/login`,
        body: {
          "username": `${username}`,
          "password": `${password}`
        }
      });
      return response.data;
    } catch (err) {
      throw new Error(`${err.message}`);
    }
  }
}
