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
