<template>
  <div class="hello">
    <p>{{ count }}</p>
    <p>{{doneTodos}}</p>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
import {mapMutations, mapActions} from 'vuex'
// import { mapActions } from 'vuex'
export default {
  name: 'hello',
  // computed: mapState({
  //   count: state => state.count,
  //   countAlias: 'count',
  //   countPlusLocalState (state) {
  //     return state.count + this.localCount
  //   }
  // }),
  created () {
    this.add()
    this.set()
  },
  computed: {
    count () {
      // vuex state
      return this.$store.state.count
    },
    doneTodos () {
      // vuex getters
      return this.$store.getters.doneTodos
    }
  },
  methods: {
    // vuex mutations
    ...mapMutations({
      add: 'COUNT_DATA'
    }),
    // vuex actions
    ...mapActions({
      set: 'setData'
    })
  },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
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
