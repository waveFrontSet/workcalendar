import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  //timeout: 2000,
});

export const api = {
  async getEntries() {
    return instance.get("/track/entries");
  },
};
