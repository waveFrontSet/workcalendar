<template>
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Entries</v-card-title>
        <create-entry />
        <v-data-table :headers="headers" :items="entries" sort-by="day">
          <template v-slot:item.actions="{ item }">
            <v-icon small @click="deleteEntry(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapState } from "vuex";
import CreateEntry from "./CreateEntry.vue";

export default Vue.extend({
  components: { CreateEntry },
  name: "EntryList",
  data: () => ({
    headers: [
      { text: "Date", value: "day" },
      { text: "Type", value: "day_type" },
      { text: "Actions", value: "actions" },
    ],
  }),
  computed: {
    ...mapState(["entries"]),
  },
  methods: {
    ...mapActions(["fetchEntries", "deleteEntry"]),
  },
  async mounted() {
    this.fetchEntries();
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
