<template>
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Entries</v-card-title>
        <v-data-table :headers="headers" :items="entries" sort-by="day">
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Entries</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    New Entry
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-date-picker
                          v-model="editedItem.day"
                          no-title
                          scrollable
                        >
                        </v-date-picker>
                        <v-col cols="12" sm="6" md="4">
                          <v-select
                            v-model="editedItem.day_type"
                            :items="dayTypes"
                            label="Day type"
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      Cancel
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
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

export default Vue.extend({
  name: "EntryList",
  data: () => ({
    menu: false,
    dayTypes: ["work", "vacation", "holiday", "sick", "homeoffice"],
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
    editedItem: {
      day: new Date().toISOString().substr(0, 10),
      day_type: "work",
    },
    defaultItem: {
      day: new Date().toISOString().substr(0, 10),
      day_type: "work",
    },
    headers: [
      { text: "Date", value: "day" },
      { text: "Type", value: "day_type" },
      { text: "Actions", value: "actions" },
    ],
  }),
  computed: {
    ...mapState(["entries"]),
    formTitle() {
      return this.editedIndex == -1 ? "New Entry" : "Edit";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  methods: {
    ...mapActions(["fetchEntries", "deleteEntry", "createEntry"]),
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      this.createEntry(this.editedItem);
    },
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
