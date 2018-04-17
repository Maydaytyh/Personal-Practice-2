<template>
  <div id="app">
  <router-view></router-view>
  </div>
</template>

<script>
import Axios from 'axios'
import Ip from './api/api.js'
export default {
  name: 'app',
  created () {
    this.userName = location.search.substring(10)
    console.log(Ip)
    Axios({
      method: 'get',
      url: Ip.bikeDev+'user/q/status?name=' + this.userName
    }).then((response) => {
      this.roleNum = response.data
      console.log(response.data )
    })
    // var commonUrl = "?username=" + this.userName 
    var commonUrl = location.origin + location.pathname + "?username=" + this.userName 
    if(this.roleNum === 0){
      location = commonUrl + "#/common"
    }else if(this.roleNum === 1){
      location = commonUrl + "#/admin"
    }else if(this.roleNum === 2){
      location = commonUrl + "#/superadmin"
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
    /* background:rgba(204,204,204,1); */
}
.el-button+.el-button {
    margin-left: 0px;
}
.clearPadding{
  padding:0;
  display:inline-block;
}
.createBody{
    text-align: center;
    font-weight: normal;
}
</style>
