<template>
  <div class="vuextest">
      <ul>
      <li v-for="user in users">
          {{ user }}
      </li>
      </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: mapGetters({
    users: 'allUsers'
  }),
  created () {
    this.$store.dispatch('getAllUsers')
  }
}
</script>