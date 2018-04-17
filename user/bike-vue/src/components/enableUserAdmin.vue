<template class="enableUserAdmin">
        <el-button type="success" @click="open2" size="small">{{STATE}}</el-button>
</template>

<script>
  import Axios from 'axios'
  import Ip from '../api/api.js'

  export default {
    props: ['delData', 'delIndex', 'finalDelData'],
    name: 'enableUserAdmin',
    template: '<enableUserAdmin/>',
    urlDef: '',
    localName: '',
    watch: {
      finalDelData: function () {
        this.localName = this.finalDelData.name
      }
    },
    methods: {
      open2 () {
        this.$confirm('此操作将启用该用户' + ', 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.localName = this.finalDelData.name
          this.urlDef = Ip.bikeDev+'user/' + this.localName + '?enable=Y'
          Axios({
            method: 'post',
            url: this.urlDef
          }).then((response) => {
          })
          .catch(function (error) {
            console.log(error)
          })
          this.$message({
            type: 'success',
            message: '启用成功!'
          })
          location.reload(true)
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
        STATE: '启用'
      }
    }
  }
</script>