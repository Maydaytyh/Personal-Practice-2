<template>
        <div class="superadmin">
            <div class="user-header">
              <retriveUserSuper :currentPage="currentPage" @valueUp="recieveSize" @valueUpUp="recieveUser" ref="retriveUser"></retriveUserSuper>
            </div>
            <div class="user-body">
              <div class="body-header">
                <el-row :gutter="20">
                  <el-col :span="16"><div class="userList">超级管理员用户列表</div></el-col>
                  <el-col :span="8"><div class="addUser"><createUserSuper></createUserSuper></div></el-col>
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
                    prop="status"
                    label="是否管理员"
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
                      <div @click='handleEdit(scope.$index, scope.row)' class="clearPadding"><updateUserSuper :ftsData="tableData" :ftsIndex="updateIndex" :finalData="finalData"></updateUserSuper></div>
                      <div @click='handleDelete(scope.$index, scope.row)' class="clearPadding"><deleteUserSuper :delData="tableData" :delIndex="deleteIndex" :finalDelData="finalDelData"></deleteUserSuper></div>
                      <div @click='handleDelete(scope.$index, scope.row)' class="clearPadding"><enableUserSuper :delData="tableData" :delIndex="deleteIndex" :finalDelData="finalDelData"></enableUserSuper></div>                  
                      <div @click='handleCopy(scope.$index, scope.row)' class="clearPadding"><copyUserSuper :ftsCopyData="tableData" :ftsCopyIndex="copyIndex" :finalCopyData="finalCopyData"></copyUserSuper></div>
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
    import createUserSuper from './createUserSuper'
    import retriveUserSuper from './retriveUserSuper'
    import updateUserSuper from './updateUserSuper'
    import deleteUserSuper from './deleteUserSuper'
    import copyUserSuper from './copyUserSuper'
    import enableUserSuper from './enableUserSuper'
    import Axios from 'axios'
    import Ip from '../api/api.js'

    export default {
      name: 'superadmin',
      components: {createUserSuper, retriveUserSuper, updateUserSuper, deleteUserSuper, copyUserSuper, enableUserSuper},
      created () {
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
          // console.log(index)
          this.deleteIndex = index
          this.finalDelData = this.tableData[this.deleteIndex]
        },
        handleCopy (index, row) {
          this.copyIndex = index
          this.finalCopyData = this.tableData[this.copyIndex]
        },
        handleSizeChange (val) {
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
            this.userData[i].groups=this.userData[i].groups.map(function(x,i,arr){
              if(i!==arr.length-1){ return x+"，"}
              else{
                return x
              }
             })
            // console.log(this.userData[i].groups)
            // this.userData[i].groups=this.userData[i].groups.join('，')
            this.$set(this.tableData, i, this.userData[i])
          }
        },
        recieveSize: function (para) { // recieve 事件需要设置参数，这些参数就是子组件传递过来的数据，因此，参数的个数，也要和子元素传递过来的一致。
          this.userSize = para
        }
      },
      data () {
        return {
          value: '',
          input: '',
          tableData: [{
            name: 'superadmin',
            password: '',
            description: '',
            enable: '',
            province: '浙江省',
            city: '杭州市',
            net: null,
            groups: [],
            status: ""
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