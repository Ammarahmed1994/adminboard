import axios from "axios";

const API_URL = "http://45.77.29.107:4200/api/admin";
const token =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IjExNDA1ODY4NzkiLCJwYXNzd29yZCI6IjEyMzQ1NiIsInRpbWUiOiIyMDIyLTAyLTI0VDE0OjI2OjMxKzAyOjAwIiwiaWF0IjoxNjQ1NzA1NTkxfQ.Q-knS04FHm6ZMLMtSdBBXYlvYeZ1m8HY-x-LDrdBuZq9u6Y0OkPW4p9gN0hH1cplVA-UeW9MJhyt6f9xzIqthD8_BS7W_TbUK51UrI3zOzVhTSdlm40vR0psg4A3Fjcqd72sQarn9W75qVqxd9bttok9Nc1jgfKEUP13jVU3PTo";
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
          "Access-Control-Allow-Origin": "*",
        },
      });
      console.log(response);
      return response.data;
    } catch (err) {
      //   throw new Error(`${err.message}`);
      console.log(err);
    }
  }
}
