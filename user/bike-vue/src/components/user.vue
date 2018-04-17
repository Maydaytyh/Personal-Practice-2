<template>
    <div class="user">
        <div class="user-header">
          <retriveUser :currentPage="currentPage" @valueUp="recieveSize" @valueUpUp="recieveUser" ref="retriveUser"></retriveUser>
        </div>
        <div class="user-body">
          <div class="body-header">
            <el-row :gutter="20">
              <el-col :span="16"><div class="userList">用户列表</div></el-col>
              <el-col :span="8"><div class="addUser"><el-button type="text"><createUser></createUser></el-button></div></el-col>
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
                  <el-button type="text" size="small" @click='handleEdit(scope.$index, scope.row)'><updateUser :ftsData="tableData" :ftsIndex="updateIndex" :finalData="finalData"></updateUser></el-button>
                  <el-button type="text" size="small" @click='handleDelete(scope.$index, scope.row)'><deleteUser :delData="tableData" :delIndex="deleteIndex" :finalDelData="finalDelData"></deleteUser></el-button>
                  <el-button type="text" size="small" @click='handleDelete(scope.$index, scope.row)'><enableUser :delData="tableData" :delIndex="deleteIndex" :finalDelData="finalDelData"></enableUser></el-button>                  
                  <el-button type="text" size="small" @click='handleCopy(scope.$index, scope.row)'><copyUser :ftsCopyData="tableData" :ftsCopyIndex="copyIndex" :finalCopyData="finalCopyData"></copyUser></el-button>
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
import createUser from './createUser'
import retriveUser from './retriveUser'
import updateUser from './updateUser'
import deleteUser from './deleteUser'
import copyUser from './copyUser'
import enableUser from './enableUser'
export default {
  name: 'user',
  components: {createUser, retriveUser, updateUser, deleteUser, copyUser, enableUser},
  created () {
    // console.log($(this))
    // 组件初始化阶段获取用户列表长度userSize，为分页做准备
  },
  methods: {
    // 服务updateUser修改特定行数据
    handleEdit (index, row) {
      // console.log(index)
      this.updateIndex = index
      this.finalData = this.tableData[this.updateIndex]
    },
    // 服务deleteUser组件删除特定行用户
    handleDelete (index, row) {
      // console.log(index)
      this.deleteIndex = index
      this.finalDelData = this.tableData[this.deleteIndex]
      // this.indexAssign(this.deleteIndex, this.finalDelData)
    },
    handleCopy (index, row) {
      // console.log(index)
      this.copyIndex = index
      this.finalCopyData = this.tableData[this.copyIndex]
    },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
    },
    // 耦合retriveUser按页获取数据
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      // console.log(val)
      this.currentPage = val
    },
    // 接收查询子组件数据
    recieveUser: function (para) { // recieve 事件需要设置参数，这些参数就是子组件传递过来的数据，因此，参数的个数，也要和子元素传递过来的一致。
      this.userData = para
      this.tableData = []
      for (var i = 0; i < this.userData.length; i++) {
        this.$set(this.tableData, i, this.userData[i])
      }
      // console.log(this.tableData[0])
    },
    recieveSize: function (para) { // recieve 事件需要设置参数，这些参数就是子组件传递过来的数据，因此，参数的个数，也要和子元素传递过来的一致。
      this.userSize = para
      // console.log(this.tableData[0])
    }
    // indexAssign: function (destindex, data) {
    //   data = this.tabledata[destindex]
    // }
  },
  data () {
    return {
      value: '',
      input: '',
      tableData: [{
        name: 'Frank',
        password: 'Frank123',
        description: '世界上最帥的人',
        enable: '1',
        province: '浙江省',
        city: '杭州市',
        net: null,
        groups: '共享单车免费骑'
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
  .el-row {
    &:last-child {
      margin-bottom: 0;
    }
  }
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