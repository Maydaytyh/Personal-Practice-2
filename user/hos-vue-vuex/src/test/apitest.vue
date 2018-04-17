<template>
    <div class="apitest">
      {{msg}}
    </div>
  </template>
  
  <script>
  import dataApi from '../api/dataapi'
  import Ip from '../api/ip/ip.js'
  import Get from '../api/url/get.js'
  import Post from '../api/url/post.js'

  export default {
    name: 'apitest',
    template: '<apitest/>',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    mounted(){
        //测试get
        var localname = "postman"
        var fullUrl = Ip.test + Get.name + localname
        dataApi.getData(fullUrl,this.printData)
        //测试post
        var postObj = {
          name:"foobarbazkk",
          password:"a",
          description:"abcde",
          enable:"Y",
          status:"Y",
          province:"安徽省",
          city:"天长市",
          net:null,
          groups:[
              "Area"
          ]
        }
        // var jsonObj = JSON.stringify(postObj)
        var postUrl = Ip.test + Post.create
        dataApi.postData(postUrl,postObj)
    },
    methods:{
      printData(para){
        console.log(para)
      }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  
  </style>
  