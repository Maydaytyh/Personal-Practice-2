<template>
    <div class="admin">
        <div class="user-header">
            <retrive></retrive>
        </div>
        <div class="user-body">
            <div class="body-header">
            <el-row :gutter="20">
                <el-col :span="16"><div class="userList">管理员用户列表</div></el-col>
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
                    <div @click='handleDelete(scope.$index, scope.row)' class="clearPadding"><turnon :finalDelData="finalDelData"></turnon></div>        
                    <div @click='handleDelete(scope.$index, scope.row)' class="clearPadding"><turnoff :finalDelData="finalDelData"></turnoff></div>
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
// 引入CRUD等子组件和mapGetters
import create from '../components/create'
import retrive from '../components/retrive'
import update from '../components/update'
import copy from '../components/copy'
import turnon from '../components/turnon'
import turnoff from '../components/turnoff'
import pag from '../components/pag'
import {mapGetters} from 'vuex'

export default {
    name: 'admin',
    components:{create,retrive,update,turnon,turnoff,copy,pag},
    created () {
        this.userName = location.search.substring(10)
        this.$store.dispatch('limitAdmin',this.userName)
        this.$store.dispatch('getAllHospital'),
        this.$store.dispatch('getGroups',this.userName)
        this.$store.dispatch('getAllDeparts')
    },
    watch: {
        updateUsername: function () {
            this.$store.dispatch("getCurrentUser",this.updateUsername)            
        },
        copyUsername:function(){
            this.$store.dispatch("getCurrentUser",this.copyUsername)
        }
    },
    computed:mapGetters({
        users:'allUsers',
        size:'userSize',
        ks:'allKS'
    }),
    methods: {
        // 服务update组件
        handleEdit (index, row) {
            console.log(this)
            this.updateUsername = row.name
        },
        //服务copy组件
        handleCopy (index, row) {
            this.copyUsername = row.name
        },
        // 服务turnon/turnoff组件
        handleDelete (index, row) {
            this.deleteIndex = index
            this.finalDelData = this.users[this.deleteIndex]
        },

    },
    data () {
        return {
            value: '',
            input: '',
            userForm:[{
                name:'admin',
                description:'管理员用户',
                password:'123',
                enable:'Y',
                fy:['XX医院','XX市第三人民医院'],
                ks:["XX门诊","XX全科"],
                groups:["test"]
            }],
            updateIndex: 0,
            deleteIndex: 0,
            copyIndex: 0,
            finalDelData: {},
            updateUsername:'',
            copyUsername:''
        }
        //完整真实数据
        // fy:[{key: "2", value: "慈林医院"}, {key: "3", value: "慈溪市第三人民医院"}],
        // ks:[
        //      {fy: {key: "2", value: "慈林医院"}, ks: {key: "2_202", value: "全科门诊1"}},      
        //      {fy: {key: "3", value: "慈溪市第三人民医院"}, ks: {key: "3_1113_OLD", value: "大通全科"}}
        // ],
        // groups:[{key: "BIConsumers", value: "BIConsumers"}]
    }
}
</script>

<style scoped>
    .el-col {
    border-radius: 4px;
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