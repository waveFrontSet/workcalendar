<template>
  <div class="submit-form mt-3 mx-auto">
    <p class="headline">Add Entry</p>

    <div>
      <v-form ref="form" lazy-validation>
        <v-layout row wrap>
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="unprocessedDate"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="unprocessedDate"
                label="Picker in menu"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="unprocessedDate" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menu.save(unprocessedDate)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-layout>
        <v-text-field
          v-model="dayType"
          :rules="[(v) => !!v || 'Type is required']"
          label="Type"
          required
        ></v-text-field>
      </v-form>

      <v-btn color="primary" class="mt-3" @click="createEntry">Submit</v-btn>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "CreateEntry",
  data: () => ({
    menu: false,
    unprocessedDate: new Date().toISOString().substr(0, 10),
    dayType: "homeoffice",
  }),
  computed: {
    entry() {
      return {
        day: this.unprocessedDate,
        day_type: this.dayType,
      };
    },
  },
  methods: {
    createEntry() {
      this.$store.dispatch("createEntry", this.entry);
    },
  },
});
</script>

<style>
.submit-form {
  max-width: 300px;
}
</style>
