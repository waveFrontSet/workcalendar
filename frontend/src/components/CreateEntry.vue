<template>
  <v-toolbar flat>
    <v-dialog v-model="dialog" max-width="500px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
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
              <v-date-picker v-model="editedItem.day" no-title scrollable>
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
          <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
          <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-toolbar>
</template>

<script>
import Vue from "vue";
import { mapActions } from "vuex";

export default Vue.extend({
  name: "CreateEntry",
  data: () => ({
    menu: false,
    dayTypes: ["work", "vacation", "holiday", "sick", "homeoffice"],
    dialog: false,
    editedIndex: -1,
    editedItem: {
      day: new Date().toISOString().substr(0, 10),
      day_type: "work",
    },
    defaultItem: {
      day: new Date().toISOString().substr(0, 10),
      day_type: "work",
    },
  }),
  computed: {
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
    ...mapActions(["createEntry"]),
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
});
</script>
