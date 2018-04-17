<template>
  <div id="app">
  <router-view></router-view>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  name: 'app',
  created () {
    console.log(location)
    this.userName = location.search.substring(10)
    Axios({
      method: 'get',
      url: 'user/q/status?name=' + this.userName
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
}
body{
    margin:0;
    padding:0;
    background:rgba(204,204,204,1);
}
</style>
