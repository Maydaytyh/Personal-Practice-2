<template>
  <div class="createUserAdmin">
      <el-button type="info" @click="showForm()">新增</el-button>

      <el-dialog title="新增用户" :visible.sync="dialogFormVisible" class="createBody">
        <el-form :model="userForm" :rules="rules">
          <el-form-item label="用户名" :label-width="formLabelWidth" prop="name">
            <el-input v-model="userForm.name" auto-complete="off" size="small"></el-input>
          </el-form-item>
          <el-form-item label="用户说明" :label-width="formLabelWidth">
            <el-input v-model="userForm.description" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户口令" :label-width="formLabelWidth" prop="password">
            <el-input type="password" v-model="userForm.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认口令" :label-width="formLabelWidth" prop="confirmPassword" required>
            <el-input type="password" v-model="userForm.confirmPassword" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="启用状态" :label-width="formLabelWidth">
            <el-select v-model="userForm.enable" placeholder="请选择启用状态" disabled>
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
            <el-select v-model="userForm.city" placeholder="请选择" @change="drillCities" v-bind:disabled="disabledCity" clearable>  
              <el-option
                v-for="item in citiesData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="可查站点" :label-width="formLabelWidth">
              <el-select v-model="userForm.net" placeholder="请选择" @change="valueToLabelNet" v-bind:disabled="disabledNet" clearable>
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
          <el-button @click="clearData()">取 消</el-button>
          <el-button type="primary" @click="postData()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
  import Axios from 'axios'
  export default {
    name: 'createUserAdmin',
    template: '<createUserAdmin/>',
    citiesUrl: '',
    netsUrl: '',
    created () {
      this.getData()
    },
    methods: {
      // 同步获取省份和组数据
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
      // 提交表单数据
      postData: function () {
        this.dialogFormVisible = false
        if (this.userForm.password === this.userForm.confirmPassword) {
          Axios({
            method: 'post',
            url: 'http://192.168.241.11:8086/user?add',
            data: this.userForm
          }).then((response) => {
            this.clearData()
          })
          .catch(function (error) {
            console.log(error)
          })
        } else {
          alert('请确认密码输入是否正确')
        }
        location.reload(true)
      },
      // 清除表单数据
      clearData: function () {
        for (var item in this.userForm) {
          this.userForm[item] = ''
        }
        this.userForm.groups = []
        this.dialogFormVisible = false
        this.userForm.enable = 'Y'
        this.userForm.password = '12345678'
        this.userForm.confirmPassword = '12345678'
      },
      // 异步省份下钻城市
      drillProvince: function (value) {
        this.userForm.city = ''
        this.userForm.net = ''
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
          this.disabledCity = false
        })
      },
      // 异步城市下钻区域
      drillCities: function (value) {
        this.userForm.net = ''
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
          this.disabledNet = false
        })
      },
      // 用户组传递label值（汉字）
      valueToLabelNet: function (value) {
        let obj = {}
        obj = this.netsData.find((item) => {
          return item.value === value
        })
        this.userForm.net = obj.label
      },
      showForm:function(){
        this.dialogFormVisible = true;
      }
    },
    data () {
      return {
        dialogFormVisible: false,
        dialogTableVisible: false,
        userForm: {
          name: '',
          password: '12345678',
          confirmPassword: '12345678',
          description: '',
          enable: 'Y',
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
          ],
          confirmPassword: [
            { required: true, message: '请再次输入用户密码', trigger: 'blur' }
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
</style>