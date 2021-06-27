<template>
  <div class="hello">
    <h1>List of entries</h1>
    <ul>
      <li v-for="entry in entries" :key="entry.id">
        {{ entry.day }} {{ entry.day_type }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    entries: [],
  },
})
export default class EntryList extends Vue {
  entries!: Array<any>;
}
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
