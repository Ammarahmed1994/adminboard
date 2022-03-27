import axios from "axios";


export class CategoryService {
  static async getCategoryList() {
    try {
      const response = await axios({
        method: `POST`,
        url: `${API_URL}/catigory/list`,
        body: {
          token: `${token}`,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      return response.data;
    } catch (err) {
    //   throw new Error(`${err.message}`);
    console.log(err)
    }
  }
}
