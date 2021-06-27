import { createStore } from "vuex";
import { api } from "@/api";

export default createStore({
  state: {
    entries: [],
  },
  mutations: {
    setEntries(state, entries) {
      state.entries = entries;
    },
  },
  actions: {
    async fetchEntries(context) {
      const response = await api.getEntries();
      const entries = response.data;
      context.commit("setEntries", entries);
    },
  },
  modules: {},
});
