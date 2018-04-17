<template>
    <div class="common">
        <div class="user-body">
          <div class="body-header">
            <el-row :gutter="20">
              <el-col :span="16"><div class="userList">普通用户列表</div></el-col>
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
              >
                <template scope="scope">
                  <div @click='handleEdit(scope.$index, scope.row)' class="clearPadding"><updateUserCommon :ftsData="tableData" :ftsIndex="updateIndex" :finalData="finalData"></updateUserCommon></div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
    </div>
</template>
<script>
import updateUserCommon from './updateUserCommon'
import Ip from '../api/api.js'
import Axios from 'axios'
export default {
  name: 'common',
  components: {updateUserCommon},
  created () {
    this.userName = location.search.substring(10)
    Axios({
      method: 'get',
      url: Ip.bikeDev+'user/q/name?name=' + this.userName
    }).then((response) => {
      this.$set(this.tableData, 0, response.data)
    })

  },
  methods: {
    // 服务updateUser修改特定行数据
    handleEdit (index, row) {
      this.updateIndex = index
      this.finalData = this.tableData[this.updateIndex]
    }
  },
  data () {
    return {
      tableData: [{
        name: 'common',
        password: 0,
        description: '',
        enable: '',
        province: '',
        city: '',
        net: null,
        groups: []
      }],
      updateIndex: 0,
      finalData: {},
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
    display:none;
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