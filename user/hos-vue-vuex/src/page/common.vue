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
                :data="userForm"
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
                prop="fy"
                label="可查机构"
                >
                </el-table-column>
                <el-table-column
                prop="ks"
                label="可查科室"
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
                    <div @click='handleEdit(scope.$index, scope.row)' class="clearPadding"><updateCommon></updateCommon></div>
                </template>
                </el-table-column>
            </el-table>
            </div>
        </div>
        <div class="user-footer">
            <div class="block">
            </div>
        </div>
    </div>
</template>
<script>
import updateCommon from '../components/updateCommon'
import Axios from 'axios'

import {mapGetters} from 'vuex'
import * as API from '../api/hos/api.js'
export default {
    name: 'admin',
    components:{updateCommon},
    created () {
        this.$store.dispatch('getAllHospital'),
        this.$store.dispatch('getGroups')
        this.$store.dispatch('getAllDeparts')
        this.userName = location.search.substring(10)
        Axios({
        method: 'get',
        url: API.Ip.hosDev + 'user/q/name?name=' + this.userName
        }).then((response) => {
            //抽取数据并转换，待提交到vuex
            var arr = response.data.fy
            var fyArr = []
            for(var j=0;j<arr.length;j++){

                    fyArr.push(arr[j].value)
                }
            response.data.fy = fyArr.join('，')

            var arr1 = response.data.ks
            var ksArr = []
                for(var n=0;n<arr1.length;n++){
                    ksArr.push(arr1[n].value) 
            }
            response.data.ks = ksArr.join('，')

            var arr = response.data.groups
            var groupArr = []
            for(var j=0;j<arr.length;j++){
                groupArr.push(arr[j].value)
            }
            response.data.groups = groupArr.join('，')

            this.$set(this.userForm, 0, response.data)
        })
    },
    // computed:mapGetters({
    //     currentUser:'commonCurrentUser'
    // }),   
    watch: {
        username: function () {
            this.$store.dispatch("getCurrentUser",this.username)
        }
    },
    methods: {
        // 服务updateUser修改特定行数据
        handleEdit (index, row) {
            this.username = row.name
        }
    },
    data () {
        return {
            value: '',
            input: '',
            userForm:[{
                name:'common',
                description:'普通用户',
                password:'123',
                enable:'Y',
                fy:['XX医院','XX市第三人民医院'],
                ks:["XX门诊","XX全科"],
                groups:["test"]
            }],
            username:''        
        }
    }
}
</script>

<style scoped>
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