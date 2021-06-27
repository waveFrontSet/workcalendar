<template>
  <div class="home">
    <EntryList :entries="entries" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import EntryList from "@/components/EntryList.vue"; // @ is an alias to /src

@Options({
  components: {
    EntryList,
  },
  computed: {
    entries() {
      return this.$store.state.entries;
    },
  },
  async mounted() {
    this.$store.dispatch("fetchEntries");
  },
})
export default class Entries extends Vue {}
</script>
