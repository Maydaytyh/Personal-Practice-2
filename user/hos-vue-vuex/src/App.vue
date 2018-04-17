<template>
    <div id="app">
      <router-view></router-view>
    </div>
</template>

<script>
import * as API from './api/hos/api.js'
import Axios from 'axios'
export default {
  name: 'app',
  created () {
    console.log(this)
    // console.log(location)
    this.test()
    this.userName = location.search.substring(10)
    Axios({
      method: 'get',
      url: API.Ip.hosDev + 'user/q/status?name=' + this.userName
    }).then((response) => {
      console.log(response)
      this.roleNum = response.data
    })
    console.log(this.userName)
    console.log(this.roleNum)
    if(this.roleNum === 0){
      location = location.origin + location.pathname + "?username=" + this.userName + "#/common"
    }else if(this.roleNum === 1){
      location = location.origin + location.pathname + "?username=" + this.userName + "#/admin"
    }else if(this.roleNum === 2){
      location = location.origin + location.pathname + "?username=" + this.userName + "#/superadmin"
    }
  },
  watch:{
    roleNum: function(){
      if(this.roleNum === 0){
        location = location.origin + location.pathname + "?username=" + this.userName + "#/common"
      }else if(this.roleNum === 1){
        location = location.origin + location.pathname + "?username=" + this.userName + "#/admin"
      }else if(this.roleNum === 2){
        location = location.origin + location.pathname + "?username=" + this.userName + "#/superadmin"
      }
    }
  },
  methods:{
    test(){
      console.log(this)
    }
  },
  data () {
    return {
      userName: '',
      roleNum: 0
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.clearPadding{
  padding:0;
  display:inline-block;
}
</style>
  