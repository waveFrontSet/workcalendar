import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  //timeout: 2000,
});

interface EntryPayload {
  day?: Date;
  day_type?: "holiday" | "homeoffice" | "sick" | "vacation" | "work";
}

export const api = {
  async getEntries() {
    return instance.get("/track/entries");
  },
  async updateEntry(id: number, payload: EntryPayload) {
    return instance.put(`/track/entries/${id}`, payload);
  },
  async createEntry(payload: EntryPayload) {
    return instance.post("/track/entries", payload);
  },
  async deleteEntry(id: number) {
    return instance.delete(`/track/entries/${id}`);
  },
};
