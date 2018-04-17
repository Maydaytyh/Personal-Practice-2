<template class="turnon">
        <el-button type="success" @click="open2" size="small">{{STATE}}</el-button>
</template>

<script>
  import * as Api from '../api/hos/api.js'
  export default {
    props: ['finalDelData'],
    name: 'turnon',
    template: '<turnon/>',
    methods: {
      open2 () {
        this.$confirm('此操作将启用该用户' + ', 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.userName = location.search.substring(10)
          this.pageNum = this.$store.getters.page
          this.localName = this.finalDelData.name
          // this.localName = this.$store.getters.search.name
          this.urlDef = Api.Ip.hosDev+'user/' + this.localName + '?enable=Y'
          this.$store.dispatch("postTurnOnUser",
            {
              url:this.urlDef,
              name:this.localName,
              num:this.pageNum,
              username:this.userName,
              searchName:this.$store.getters.search.name
            }
          )
          this.$message({
            type: 'success',
            message: '启用成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消启用'
          })
        })
      }
    },
    data () {
      return {
        STATE: '启用',
        pageNum:0,
        urlDef: '',
        localName: '',
        userName:''
      }
    }
  }
</script>