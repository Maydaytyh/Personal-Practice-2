<template>
    <div class="admin">
        <div class="user-header">
          <retriveUserAdmin :currentPage="currentPage" @valueUp="recieveSize" @valueUpUp="recieveUser" ref="retriveUser"></retriveUserAdmin>
        </div>
        <div class="user-body">
          <div class="body-header">
            <el-row :gutter="20">
              <el-col :span="16"><div class="userList">管理员用户列表</div></el-col>
              <el-col :span="8"><div class="addUser"><createUserAdmin></createUserAdmin></div></el-col>
            </el-row>
          </div>
          <div class="body-content">
            <el-table
              :data="tableData"
              border
              style="width: 100%">
              <el-table-column
                prop="name"
                label="用户名">
              </el-table-column>
              <el-table-column
                prop="description"
                label="用户说明"
              >
              </el-table-column>
              <el-table-column
                prop="password"
                label="用户口令"
              >
              </el-table-column>
              <el-table-column
                prop="enable"
                label="启用状态"
              >
              </el-table-column>
              <el-table-column
                prop="province"
                label="可查省份"
              >
              </el-table-column>
              <el-table-column
                prop="city"
                label="可查城市"
              >
              </el-table-column>
              <el-table-column
                prop="net"
                label="可查站点"
              >
              </el-table-column>
              <el-table-column
                prop="groups"
                label="所属组"
                width="150"
              >
              </el-table-column>
              <el-table-column
                label="功能"
                width="300"
              >
                <template scope="scope">
                  <!-- <el-button type="text" size="small" @click='handleEdit(scope.$index, scope.row)'><updateUserAdmin :ftsData="tableData" :ftsIndex="updateIndex" :finalData="finalData"></updateUserAdmin></el-button>
                  <el-button type="text" size="small" @click='handleDelete(scope.$index, scope.row)'><deleteUserAdmin :delData="tableData" :delIndex="deleteIndex" :finalDelData="finalDelData"></deleteUserAdmin></el-button>
                  <el-button type="text" size="small" @click='handleDelete(scope.$index, scope.row)'><enableUserAdmin :delData="tableData" :delIndex="deleteIndex" :finalDelData="finalDelData"></enableUserAdmin></el-button>                  
                  <el-button type="text" size="small" @click='handleCopy(scope.$index, scope.row)'><copyUserAdmin :ftsCopyData="tableData" :ftsCopyIndex="copyIndex" :finalCopyData="finalCopyData"></copyUserAdmin></el-button> -->
                  <div @click='handleEdit(scope.$index, scope.row)' class="clearPadding"><updateUserAdmin   :ftsData="tableData" :ftsIndex="updateIndex" :finalData="finalData"></updateUserAdmin></div>
                  <div @click='handleDelete(scope.$index, scope.row)' class="clearPadding"><deleteUserAdmin  :delData="tableData" :delIndex="deleteIndex" :finalDelData="finalDelData"></deleteUserAdmin></div>
                  <div @click='handleDelete(scope.$index, scope.row)' class="clearPadding"><enableUserAdmin :delData="tableData" :delIndex="deleteIndex" :finalDelData="finalDelData"></enableUserAdmin></div>        
                  <div @click='handleCopy(scope.$index, scope.row)' class="clearPadding"><copyUserAdmin  :ftsCopyData="tableData" :ftsCopyIndex="copyIndex" :finalCopyData="finalCopyData"></copyUserAdmin></div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="user-footer">
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="10"
              layout="prev, pager, next, jumper"
              :total="userSize">
            </el-pagination>
          </div>
        </div>
    </div>
</template>
<script>
// 引入CRUD子组件和Axios异步请求库
import createUserAdmin from './createUserAdmin'
import retriveUserAdmin from './retriveUserAdmin'
import updateUserAdmin from './updateUserAdmin'
import deleteUserAdmin from './deleteUserAdmin'
import copyUserAdmin from './copyUserAdmin'
import enableUserAdmin from './enableUserAdmin'
import Axios from 'axios'
import Ip from '../api/api.js'
export default {
  name: 'admin',
  components: {createUserAdmin, retriveUserAdmin, updateUserAdmin, deleteUserAdmin, copyUserAdmin, enableUserAdmin},
  created () {
    // console.log(api)
    this.userName = location.search.substring(10)
    Axios({
      method: 'get',
      url: Ip.bikeDev+'user/q/status?name=' + this.userName
    }).then((response) => {
      // console.log(response)
    })
  },
  methods: {
    // 服务updateUser修改特定行数据
    handleEdit (index, row) {
      this.updateIndex = index
      this.finalData = this.tableData[this.updateIndex]
    },
    // 服务deleteUser组件删除特定行用户
    handleDelete (index, row) {
      this.deleteIndex = index
      this.finalDelData = this.tableData[this.deleteIndex]
    },
    handleCopy (index, row) {
      this.copyIndex = index
      this.finalCopyData = this.tableData[this.copyIndex]
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    // 耦合retriveUser按页获取数据
    handleCurrentChange (val) {
      this.currentPage = val
    },
    // 接收查询子组件数据
    recieveUser: function (para) { // recieve 事件需要设置参数，这些参数就是子组件传递过来的数据，因此，参数的个数，也要和子元素传递过来的一致。
      this.userData = para
      this.tableData = []
      for (var i = 0; i < this.userData.length; i++) {
        console.log(this.userData[i].groups)
        this.userData[i].groups=this.userData[i].groups.map(function(x,i,arr){
              if(i!==arr.length-1){ return x+"，"}
              else{
                return x
              }
             })
        // console.log(this.userData[i].groups)
        // console.log( this.userData)
        this.$set(this.tableData, i, this.userData[i])
        // this.tableData[i].groups.join(',')
      }
    },
    recieveSize: function (para) {
      this.userSize = para
    }
  },
  data () {
    return {
      value: '',
      input: '',
      tableData: [{
        name: 'admin',
        password: '',
        description: '',
        enable: '',
        province: '浙江省',
        city: '杭州市',
        net: null,
        groups: []
      }],
      userData: {},
      updateIndex: 0,
      deleteIndex: 0,
      copyIndex: 0,
      userSize: 0,
      currentPage: 1,
      finalData: {},
      finalDelData: {},
      finalCopyData: {},
      userName: ''
    }
  }
}
</script>

<style scoped>
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .user-header{
    background:#fff;
    padding:10px;
    margin:10px;
  }
  .user-body{
    margin:10px;
    background:#fff;
  }
  .body-header{
    padding:10px;
    font-weight:bold;
  }
  .userList{
    text-align:left;
    padding:10px 15px;
    background:#fff;
  }
  .addUser{
    text-align:right;
  }
</style>