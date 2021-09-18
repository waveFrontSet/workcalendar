import Vue from "vue";
import Vuex from "vuex";
import { api } from "@/api";

type Entry = {
  id: number;
  day: Date;
  day_type: string;
};

interface EntryState {
  entries: Entry[];
}

const state: EntryState = {
  entries: [],
};
export const mutations = {
  setEntries(state: EntryState, entries: Entry[]) {
    state.entries = entries;
  },
  addEntry(state: EntryState, entry: Entry) {
    state.entries.push(entry);
  },
  removeEntry(state: EntryState, id: number) {
    state.entries = state.entries.filter((entry) => entry.id != id);
  },
};

Vue.use(Vuex);
export default new Vuex.Store({
  state,
  mutations,
  actions: {
    async fetchEntries(context) {
      const entries = await api.getEntries().then((response) => response.data);
      context.commit("setEntries", entries);
    },
    async createEntry(context, entry) {
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
