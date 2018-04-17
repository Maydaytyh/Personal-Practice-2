<template>
    <div class="create">
        <el-button type="info" @click="dialogFormVisible=true">新增</el-button>
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
                <el-form-item label="确认口令" :label-width="formLabelWidth" prop="confirmPassword">
                    <el-input type="password" v-model="userForm.confirmPassword" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="启用状态" :label-width="formLabelWidth">
                    <el-select v-model="userForm.enable" placeholder="请选择启用状态" disabled>
                        <el-option label="启用" value="Y"></el-option>
                        <el-option label="不启用" value="N"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属机构" :label-width="formLabelWidth" required>
                    <el-select v-model="userForm.fy" placeholder="请选择" @change="getDeparts" clearable filterable multiple>
                        <el-option
                            v-for="item in limit"
                            :key="item.key"
                            :label="item.value"
                            :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属科室" :label-width="formLabelWidth">
                    <el-select v-model="userForm.ks" placeholder="请选择" clearable filterable multiple >  
                        <el-option
                            v-for="item in ks"
                            :key="item.key"
                            :label="item.value"
                            :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属组" :label-width="formLabelWidth">
                    <el-select v-model="userForm.groups" placeholder="请选择" multiple clearable filterable>
                        <el-option
                            v-for="item in groups"
                            :key="item.key"
                            :label="item.value"
                            :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelCreate()">取 消</el-button>
                <el-button type="primary" @click="createUser(userForm)">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: 'create',
    template: '<create/>',
    computed:mapGetters({
        // allHos:'allhos',
        // ks:'allKS',
        groups:'groups',
        limit:'currentAdminHoss',
        ks:'drillHos',
        search:'search',
        create:'create'
    }),
    methods:{
        createUser:function(userForm){
            console.log(this)
            this.userName = location.search.substring(10)
            if(userForm.password===userForm.confirmPassword&&userForm.name&&userForm.fy.length>0){
                this.dialogFormVisible = false
                this.pageNum = this.$store.getters.page
                this.$store.dispatch('postCreateUser',{user:userForm,num:this.pageNum,username:this.userName,searchName:this.search.name,
                    success:()=>{
                        this.$message({
                            type: 'success',
                            message: this.create.status
                        })
                    },
                    fail:()=>{
                        this.$message({
                            type: 'error',
                            message: this.create.status
                        })
                    }
                })
            }else{
                this.$message({
                    type: 'error',
                    message: '请确认用户名、密码、所属机构是否正确!'
                })
            }
        },
        cancelCreate:function(){
            this.dialogFormVisible=false
            this.$message({
                type: 'info',
                message: '新增取消!'
            })
        },
        getDeparts:function(value){
            console.log(this.ksArr)
            this.$store.dispatch("drillHos",value)
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
                fy:[],
                ks:[],
                groups:[],
            },
            formLabelWidth: '150px',
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
            pageNum:0,
            ksArr:[],
            userName:''
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.createBody{
    text-align: center;
    font-weight: normal;
}
</style>