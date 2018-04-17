<template>
  <div class="updateUserAdmin">
      <el-button type="info" size="small" @click="clickUpdate()">修改</el-button>

      <el-dialog title="修改用户" :visible.sync="dialogFormVisible" @close="closeFunc()">
        <el-form :model="userForm" :rules="rules">
          <el-form-item label="用户名" :label-width="formLabelWidth" prop="name">
            <el-input v-model="userForm.name" auto-complete="off" size="small" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户说明" :label-width="formLabelWidth">
            <el-input v-model="userForm.description" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户口令" :label-width="formLabelWidth" prop="password">
            <el-input type="password" v-model="userForm.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="启用状态" :label-width="formLabelWidth" required>
            <el-select v-model="userForm.enable" placeholder="请选择启用状态">
              <el-option label="启用" value="Y"></el-option>
              <el-option label="不启用" value="N"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="可查省份" :label-width="formLabelWidth">
            <el-select v-model="userForm.province" placeholder="请选择" @change="drillProvince" clearable>
              <el-option
                v-for="item in provincesData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="可查城市" :label-width="formLabelWidth">
            <el-select v-model="userForm.city" placeholder="请选择" @change="drillCities" clearable>  
              <el-option
                v-for="item in citiesData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="可查站点" :label-width="formLabelWidth">
              <el-select v-model="userForm.net" placeholder="请选择" @change="valueToLableNet" clearable>
                <el-option
                  v-for="item in netsData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属组" :label-width="formLabelWidth">
            <el-select v-model="userForm.groups" multiple placeholder="请选择">
                <el-option
                  v-for="item in groupsData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelPost">取 消</el-button>
          <el-button type="primary" @click="postData()">确 定</el-button>
        </div>
      </el-dialog>
    </div>  
</template>
<script>
  import Axios from 'axios'
  export default {
    props: ['ftsData', 'ftsIndex', 'finalData'],
    name: 'updateUserAdmin',
    template: '<updateUserAdmin/>',
    citiesUrl: '',
    netsUrl: '',
    created () {
      this.getData()
      console.log(this.finalData)
    },
    watch: {
      finalData: function () {
        this.userForm = this.finalData
        Axios({
          method: 'get',
          url: 'http://192.168.241.11:8086/user/q/city?province=' + this.userForm.province
        }).then((response) => {
          this.citiesData = response.data
        })
        Axios({
          method: 'get',
          url: 'http://192.168.241.11:8086/user/q/net?city=' + this.userForm.city
        }).then((response) => {
          this.netsData = response.data
        })
      }
    },
    methods: {
      getData: function () {
        var urlArr = [
          Axios.get('http://192.168.241.11:8086/user/q/province'),
          Axios.get('http://192.168.241.11:8086/user/q/group')
        ]
        Axios.all(urlArr)
          .then(Axios.spread((res1, res2) => {
            this.provincesData = res1.data
            this.groupsData = res2.data
            for (var i = 0; i < this.groupsData.length; i++) {
              this.groupsData[i].value = this.groupsData[i].label
            }
          }))
      },
      postData: function () {
        if(this.userForm.name!==''&&this.userForm.enable!==''&&this.userForm.password!==''){
          this.dialogFormVisible = false
          Axios({
            method: 'post',
            url: 'http://192.168.241.11:8086/user?update',
            data: this.userForm
          }).then((response) => {
            // location.reload(true)
          })
          .catch(function (error) {
            alert(error)
          })
        }else{
          alert('请输入必填用户信息 !')
        }
      },
      drillProvince: function (value) {
        let obj = {}
        obj = this.provincesData.find((item) => {
          return item.value === value
        })
        this.userForm.province = obj.label
        this.citiesUrl = 'http://192.168.241.11:8086/user/q/city?province=' + obj.label
        Axios({
          method: 'get',
          url: this.citiesUrl
        }).then((res) => {
          this.citiesData = res.data
        })
        this.userForm.city = ''
        this.userForm.net = ''
      },
      drillCities: function (value) {
        let obj = {}
        obj = this.citiesData.find((item) => {
          return item.value === value
        })
        this.userForm.city = obj.label
        this.netsUrl = 'http://192.168.241.11:8086/user/q/net?city=' + obj.label
        Axios({
          method: 'get',
          url: this.netsUrl
        }).then((res) => {
          this.netsData = res.data
        })
        this.userForm.net = ''
      },
      valueToLableNet: function (value) {
        let obj = {}
        obj = this.netsData.find((item) => {
          return item.value === value
        })
        this.userForm.net = obj.label
      },
      clickUpdate: function () {
        this.dialogFormVisible = true
        Axios({
          method: 'get',
          url: 'http://192.168.241.11:8086/user/q/city?province=' + this.userForm.province
        }).then((response) => {
          this.citiesData = response.data
        })
        Axios.get('http://192.168.241.11:8086/user/q/net?city=' + this.userForm.city)
        .then((response) => {
          this.netsData = response.data
        })
      },
      cancelPost: function () {
        this.dialogFormVisible = false
        location.reload(true)
        // this.userForm = this.finalData
      },
      closeFunc: function () {
        location.reload(true)
        // this.userForm = this.finalData
      }
    },
    data () {
      return {
        dialogTableVisible: false,
        dialogFormVisible: false,
        userForm: {
          name: '',
          password: '',
          description: '',
          enable: '',
          province: '',
          city: '',
          net: null,
          groups: [
          ]
        },
        formLabelWidth: '100px',
        provinces: [{
          value: '选项1',
          label: '安徽省'
        }, {
          value: '选项2',
          label: '广东省'
        }, {
          value: '选项3',
          label: '湖北省'
        }, {
          value: '选项4',
          label: '山东省'
        }, {
          value: '选项5',
          label: '浙江省'
        }],
        value5: '',
        provincesData: [],
        value6: '',
        citiesData: [],
        value7: '',
        netsData: [],
        value8: '',
        groupsData: [],
        subgroupsData: [],
        rules: {
          name: [
            { required: true, message: '请输入用户名称', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入用户密码', trigger: 'blur' }
          ]
        },
        disabledCity: true,
        disabledNet: true,
        disabledProvince: false
      }
    }
  }
</script>
<style scoped>
.updateUserAdmin{
  display: inline-block
}
</style>