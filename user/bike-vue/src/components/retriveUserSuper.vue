<template class="retriveUserSuper">
    <el-row :gutter="20">
    <el-col :span="4">
        <div class="grid-content bg-purple">
        <el-input v-model="inputName" placeholder="请输入用户名" class="input" @keyup.enter.native="searchUser"></el-input>
        </div>
    </el-col>
    <el-col :span="4">
        <div class="grid-content bg-purple">
        <el-input v-model="inputDescription" placeholder="请输入用户说明" class="input" @keyup.enter.native="searchUser"></el-input>
        </div>
    </el-col>
    <el-col :span="4">
        <div class="grid-content bg-purple">
        <el-select v-model="inputProvince" placeholder="请选择省份" class="select" filterable clearable>
                <el-option
                v-for="item in provinces"
                :key="item.value"
                :label="item.label"
                :value="item.label">
                </el-option>
        </el-select>
        </div>
    </el-col>
    <el-col :span="4">
        <div class="grid-content bg-purple">
        <el-select v-model="inputCity" placeholder="请选择城市" class="select" filterable clearable>
                <el-option
                v-for="item in cities"
                :key="item.value"
                :label="item.label"
                :value="item.label">
                </el-option>
        </el-select>
        </div>
    </el-col>
    <el-col :span="2">
        <div class="grid-content bg-purple">
        <el-button type="primary" icon="search" class="search" v-on:click="searchUser">查询</el-button>
        </div>
    </el-col>
    </el-row>
</template>
<script>
import Axios from 'axios'
import Ip from '../api/api.js'

export default {
  name: 'retriveUserSuper',
  template: '<retriveUserSuper>/',
  props: ['currentPage'],
  currentPageNum: 0,
  urlDef: '',
  created () {
    Axios({
      method: 'get',
      url: Ip.bikeDev+'user/q/size?name&description&province&city'
    }).then((response) => {
      this.retriveSize = response.data
    })
    Axios({
      method: 'get',
      url: Ip.bikeDev+'user/q/province'
    }).then((response) => {
      this.provinces = response.data
    })
    Axios({
      method: 'get',
      url: Ip.bikeDev+'user/q/city'
    }).then((response) => {
      this.cities = response.data
    })
    // 初始化获取10个用户数据
    this.urlDef = Ip.bikeDev+'user/q/user?currentPage=1&pageSize=10&&description&province&city'
    this.getData()
  },
  // 父子组件数据状态同步
  watch: {
    currentPage: function () {
      this.currentPageNum = this.currentPage
      this.searchUser()
    }
  },
  methods: {
    // 查询
    searchUser: function () {
      if (this.inputName !== '' || this.inputDescription !== '' || this.inputProvince !== '' || this.inputCity !== '') {
        this.urlDef = Ip.bikeDev+'user/q/user?currentPage=' + this.currentPageNum + '&pageSize=10&name=' + this.inputName + '&description=' + this.inputDescription + '&province=' + this.inputProvince + '&city=' + this.inputCity
        Axios({
          method: 'get',
          url: Ip.bikeDev+'user/q/size?name=' + this.inputName + '&description=' + this.inputDescription + '&province=' + this.inputProvince + '&city=' + this.inputCity
        }).then((response) => {
          this.retriveSize = response.data
        })
        this.getData()
      } else {
        this.urlDef = Ip.bikeDev+'user/q/user?currentPage=' + this.currentPageNum + '&pageSize=10&name=' + this.inputName + '&description=' + this.inputDescription + '&province=' + this.inputProvince + '&city=' + this.inputCity
        this.getData()
      }
    },
    // 请求
    getData: function () {
      Axios({
        method: 'get',
        url: this.urlDef
      }).then((response) => {
        this.propData = response.data
        this.enter()
      })
    },
    // 向父组件发射数据
    enter: function () {
      this.$emit('valueUp', this.retriveSize)
      this.$emit('valueUpUp', this.propData)
      // 子组件发射自定义事件valueUp, 并携带要传递给父组件的值，
      // 如果要传递给父组件很多值，这些值要作为参数依次列出 如 this.$emit('valueUp', this.inputValue, this.mesFather);
    }
  },
  data () {
    return {
      options: [{
        value: '1',
        label: '按名字查询'
      }, {
        value: '2',
        label: '按省份查询'
      }, {
        value: '3',
        label: '按城市查询'
      }],
      value: '',
      input: '',
      inputName: '',
      inputDescription: '',
      inputProvince: '',
      inputCity: '',
      propData: '',
      currentPageNum: 0,
      provinces: {
      },
      cities: {
      },
      retriveSize: 0
    }
  }
}
</script>