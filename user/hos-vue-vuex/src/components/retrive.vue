<template class="retrive">
    <el-row :gutter="20">
    <el-col :span="4">
        <div class="grid-content bg-purple">
        <el-input v-model="inputName" placeholder="请输入用户名" class="input" @keyup.enter.native="search"></el-input>
        </div>
    </el-col>
    <el-col :span="4">
        <div class="grid-content bg-purple">
        <el-input v-model="inputDescription" placeholder="请输入用户说明" class="input" @keyup.enter.native="search"></el-input>
        </div>
    </el-col>
    <el-col :span="4">
        <div class="grid-content bg-purple">
        <el-select v-model="inputProvince" placeholder="请选择机构" @change="getDeparts" class="select" filterable clearable>
                <el-option
                v-for="item in limit"
                :key="item.key"
                :label="item.value"
                :value="item.key">
                </el-option>
        </el-select>
        </div>
    </el-col>
    <el-col :span="4">
        <div class="grid-content bg-purple">
        <el-select v-model="inputCity" placeholder="请选择科室" class="select" filterable clearable>
                <el-option
                v-for="item in filteDeparts"
                :key="item.key"
                :label="item.value"
                :value="item.key">
                </el-option>
        </el-select>
        </div>
    </el-col>
    <el-col :span="2">
        <div class="grid-content bg-purple">
        <el-button type="primary" icon="search" class="search" @click="search()">查询</el-button>
        </div>
    </el-col>
    </el-row>
</template>
<script>
import * as Api from '../api/hos/api.js'
import {mapGetters} from 'vuex'
export default {
    name: 'retrive',
    template: '<retrive>/',
    inputProvince: '',
    computed:{
        ...mapGetters({
            allHos:'allhos',
            groups:'groups',
            // ks:'allKS',
            limit:'currentAdminHoss',
            filteDeparts:'departs'
        }),
    },
    created(){
        this.userName = location.search.substring(10)
    },
    methods: {
        filter(key,value){
            return value?key+"="+value:value
        },
        search:function(){
            this.$store.state.currentPage = 1
            console.log(this)
            var filter = this.filter
            var a = filter('&description',this.inputDescription)
            var b = filter('&fydm',this.inputProvince)
            var c = filter('&ksdm',this.inputCity)
            var d = filter('&name',this.inputName)

            this.searchUrl = Api.Ip.hosDev+'user/q/user?currentPage=1&pageSize=10'+d+a+b+c+"&user="+this.userName
            this.$store.dispatch('searchResult',this.searchUrl)
            
            this.searchUser = Api.Ip.hosDev+'user/q/size?name='+d+a+b+c+"&user="+this.userName
            this.$store.dispatch('getUsersSize',{url:this.searchUser,search:{
                name:this.inputName,
                description:this.inputDescription,
                fydm:this.inputProvince,
                ksdm:this.inputCity
            }})
        },
        getDeparts:function(value){
            console.log(value)
            this.$store.dispatch("getDepartments",value)
        }
    },
    data () {
    return {
        inputName: '',
        inputDescription: '',
        inputProvince: '',
        inputCity: '',
        searchUrl:'',
        searchUser:'',
        userName:''
    }
    }
}
</script>