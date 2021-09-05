import Vue from "vue";
import Vuex from "vuex";
import { api } from "@/api";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    entries: [],
  },
  mutations: {
    setEntries(state, entries) {
      state.entries = entries;
    },
    addEntry(state, entry) {
      state.entries.push(entry);
    },
  },
  actions: {
    async fetchEntries(context) {
      const entries = await api.getEntries().then((response) => response.data);
      context.commit("setEntries", entries);
    },
    async createEntry(context, entry) {
      console.log(entry);
      const data = await api
        .createEntry(entry)
        .then((response) => response.data);
      context.commit("addEntry", data);
    },
  },
  modules: {},
});
