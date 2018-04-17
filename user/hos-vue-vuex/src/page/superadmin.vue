<template>
    <div class="admin">
        <div class="user-header">
            <retrive></retrive>
        </div>
        <div class="user-body">
            <div class="body-header">
            <el-row :gutter="20">
                <el-col :span="16"><div class="userList">超级管理员用户列表</div></el-col>
                <el-col :span="8"><div class="addUser"><create></create></div></el-col>
            </el-row>
            </div>
            <div class="body-content">
            <el-table
                :data="users"
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
                prop="manager"
                label="是否管理员"
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
                    <div @click='handleEdit(scope.$index, scope.row)' class="clearPadding"><update></update></div>
                    <div @click='handleCopy(scope.$index, scope.row)' class="clearPadding"><copy></copy></div>
                    <div @click='handleDelete(scope.$index, scope.row)' class="clearPadding"><turnon :delIndex="deleteIndex" :finalDelData="finalDelData"></turnon></div>        
                    <div @click='handleDelete(scope.$index, scope.row)' class="clearPadding"><turnoff :delIndex="deleteIndex" :finalDelData="finalDelData"></turnoff></div>
                </template>
                </el-table-column>
            </el-table>
            </div>
        </div>
        <div class="user-footer">
            <div class="block">
                <pag></pag>
            </div>
        </div>
    </div>
</template>
<script>
import create from '../components/createSuper'
import retrive from '../components/retrive'
import update from '../components/updateSuper'
import copy from '../components/copySuper'
import turnon from '../components/turnon'
import turnoff from '../components/turnoff'
import pag from '../components/pag'

import Axios from 'axios'
import UJS from '@/util/ujs.js'

import {mapGetters} from 'vuex'
export default {
    name: 'admin',
    components:{create,retrive,update,turnon,turnoff,copy,pag},
    created () {
        this.userName = location.search.substring(10)
        this.$store.dispatch('limitAdmin',this.userName)
        // this.$store.dispatch('getAllUsers')
        this.$store.dispatch('getAllHospital'),
        this.$store.dispatch('getGroups',this.userName)
        this.$store.dispatch('getAllDeparts')
    },
    watch: {
        username: function () {
            this.$store.dispatch("getCurrentUser",this.username)            
        },
        copyusername:function(){
            this.$store.dispatch("getCurrentUser",this.copyusername)            
        }
    },
    computed:mapGetters({
        users:'allUsers',
        size:'userSize',
        create:'create',
        update:'update',
        copy:'copy',
        turnon:'turnon',
        turnoff:'turnoff',
        ks:'allKS'
    }),
    methods: {
        createUser(user){
            this.$store.dispatch('getAllHospital')
        },
        camlize(str){
            return UJS.prototype._camlize.call(this,str)
        },
        handleEdit (index, row) {
            this.username = row.name
        },
        // 服务deleteUser组件删除特定行用户
        handleDelete (index, row) {
            this.deleteIndex = index
            this.finalDelData = this.users[this.deleteIndex]
        },
        handleCopy (index, row) {
            this.copyusername = row.name
        }
    },
    data () {
        return {
            userForm:[{
                name:'superadmin',
                description:'超级管理员用户',
                password:'123',
                enable:'Y',
                fy:['XX医院','XX市第三人民医院'],
                ks:["XX门诊","XX全科"],
                groups:["test"]
            }],
            deleteIndex: 0,
            finalDelData: {},
            username:'',
            copyusername:''
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