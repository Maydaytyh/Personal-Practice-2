<template>
  <div class="copyUserSuper">
      <el-button type="info" size="small" @click="clickUpdate()">复制用户</el-button>

      <el-dialog title="复制用户" :visible.sync="dialogFormVisible" @close="closeFunc()">
        <el-form :model="userForm1" :rules="rules">
          <el-form-item label="用户名" :label-width="formLabelWidth" prop="name" required>
            <el-input v-model="userForm1.name" auto-complete="off" size="small"></el-input>
          </el-form-item>
          <el-form-item label="用户说明" :label-width="formLabelWidth" prop="description" required>
            <el-input v-model="userForm1.description" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户口令" :label-width="formLabelWidth" prop="password" required>
            <el-input type="password" v-model="userForm1.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="启用状态" :label-width="formLabelWidth">
            <el-select v-model="userForm1.enable" placeholder="请选择启用状态" disabled>
              <el-option label="启用" value="Y"></el-option>
              <el-option label="不启用" value="N"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="可查省份" :label-width="formLabelWidth">
            <el-select v-model="userForm1.province" placeholder="请选择" @change="drillProvince" disabled>
              <el-option
                v-for="item in provincesData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="可查城市" :label-width="formLabelWidth">
            <el-select v-model="userForm1.city" placeholder="请选择" @change="drillCities" disabled>  
              <el-option
                v-for="item in citiesData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="可查站点" :label-width="formLabelWidth">
              <el-select v-model="userForm1.net" placeholder="请选择" @change="valueToLableNet" disabled>
                <el-option
                  v-for="item in netsData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属组" :label-width="formLabelWidth" required>
            <el-select v-model="userForm1.groups" multiple placeholder="请选择" disabled>
                <el-option
                  v-for="item in groupsData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否管理员" :label-width="formLabelWidth">
              <el-select v-model="userForm1.status" placeholder="请选择" disabled>
                <el-option label="是" value="Y"></el-option>
                <el-option label="否" value="N"></el-option>
              </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelPost()">取 消</el-button>
          <el-button type="primary" @click="postData()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
  import Axios from 'axios'
  import Ip from '../api/api.js'

  export default {
    props: ['ftsCopyData', 'ftsCopyIndex', 'finalCopyData'],
    name: 'copyUserSuper',
    template: '<copyUserSuper/>',
    citiesUrl: '',
    netsUrl: '',
    created () {
      this.getData()
    },
    watch: {
      finalCopyData: function () {
        this.userForm1 = this.finalCopyData
        this.userForm1.name = ''
        this.userForm1.password = '12345678'
        this.userForm1.groups=this.finalCopyData.groups.map(function(x,i,arr){
          if(i!=arr.length-1){
            if(x.indexOf("，")!==-1){
            var idx = x.indexOf("，")
            x = x.substring(0,idx)
            return x
            }else{
              return x
            }
          }else{
            return x
          }
        })
      }
    },
    methods: {
      getData: function () {
        var urlArr = [
          Axios.get(Ip.bikeDev+'user/q/province'),
          Axios.get(Ip.bikeDev+'user/q/group')
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
        // this.dialogFormVisible = false
        if(this.userForm1.name!==''&&this.userForm1.description!==''&&this.userForm1.password!==''&&this.userForm1.groups.length>0){
          Axios({
            method: 'post',
            url: Ip.bikeDev+'user?add',
            data: this.userForm1
          }).then((response) => {
            location.reload(true)
          })
          .catch(function (error) {
            alert("该用户已存在！")
            location.reload(true)
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
        this.userForm1.province = obj.label
        this.citiesUrl = Ip.bikeDev+'user/q/city?province=' + obj.label
        Axios({
          method: 'get',
          url: this.citiesUrl
        }).then((res) => {
          this.citiesData = res.data
        })
        this.userForm1.city = ''
        this.userForm1.net = ''
      },
      drillCities: function (value) {
        let obj = {}
        obj = this.citiesData.find((item) => {
          return item.value === value
        })
        this.userForm1.city = obj.label
        this.netsUrl = Ip.bikeDev+'user/q/net?city=' + obj.label
        Axios({
          method: 'get',
          url: this.netsUrl
        }).then((res) => {
          this.netsData = res.data
        })
        this.userForm1.net = ''
      },
      valueToLableNet: function (value) {
        let obj = {}
        obj = this.netsData.find((item) => {
          return item.value === value
        })
        this.userForm1.net = obj.label
      },
      clickUpdate: function () {
        this.dialogFormVisible = true
        Axios({
          method: 'get',
          url: Ip.bikeDev+'user/q/city?province=' + this.userForm1.province
        }).then((response) => {
          this.citiesData = response.data
        })
        Axios.get(Ip.bikeDev+'user/q/net?city=' + this.userForm1.city)
        .then((response) => {
          this.netsData = response.data
        })
      },
      cancelPost: function () {
        this.dialogFormVisible = false
        location.reload(true)
      },
      closeFunc: function () {
        location.reload(true)
      }
    },
    data () {
      return {
        dialogTableVisible: false,
        dialogFormVisible: false,
        userForm1: {
          name: '',
          password: '',
          description: '',
          enable: '',
          province: '',
          city: '',
          net: null,
          groups: [
          ],
          status: ""
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
            { required: true, message: '请输入用户密码' }
          ],
          description: [
            { required: true, message: '请输入描述信息' }
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
.copyUserSuper{
  display: inline-block;
}
</style>