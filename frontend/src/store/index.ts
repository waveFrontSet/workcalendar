import Vue from "vue";
import Vuex from "vuex";
import { api } from "@/api";

type Entry = {
  id: number;
  day: Date;
  day_type: string;
};

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    entries: [],
  },
  mutations: {
    setEntries(state, entries: Entry[]) {
      state.entries = entries;
    },
    addEntry(state, entry: Entry) {
      state.entries.push(entry);
    },
    removeEntry(state, id) {
      state.entries = state.entries.filter((entry) => entry.id != id);
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
    async deleteEntry(context, id: number) {
      await api.deleteEntry(id);
      context.commit("removeEntry", id);
    },
  },
  modules: {},
});
