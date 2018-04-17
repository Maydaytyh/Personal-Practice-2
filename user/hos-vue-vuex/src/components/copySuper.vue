<template>
<div class="copy">
    <el-button type="info" size="small" @click="dialogFormVisible=true">复制</el-button>

    <el-dialog title="复制用户" :visible.sync="dialogFormVisible">
        <el-form :model="userForm" :rules="rules">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="name" required>
            <el-input v-model="userForm.name" auto-complete="off" size="small"></el-input>
        </el-form-item>
        <el-form-item label="用户说明" :label-width="formLabelWidth" required>
            <el-input v-model="userForm.description" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户口令" :label-width="formLabelWidth" prop="password" required>
            <el-input type="password" v-model="userForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="确认口令" :label-width="formLabelWidth" prop="confirmPassword" required>
            <el-input type="password" v-model="userForm.confirmPassword" auto-complete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="启用状态" :label-width="formLabelWidth">
            <el-select v-model="userForm.enable" placeholder="请选择启用状态" disabled>
            <el-option label="启用" value="Y"></el-option>
            <el-option label="不启用" value="N"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="是否管理员" :label-width="formLabelWidth" required>
                <el-select v-model="userForm.manager" placeholder="请选择是否管理员" disabled>
                    <el-option label="是" value="Y"></el-option>
                    <el-option label="否" value="N"></el-option>
                </el-select>
        </el-form-item>
        <el-form-item label="可查机构" :label-width="formLabelWidth">
            <el-select v-model="userForm.fy" placeholder="请选择" @change="getDeparts" disabled multiple>
            <el-option
                v-for="item in allHos"
                :key="item.key"
                :label="item.value"
                :value="item">
            </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="可查科室" :label-width="formLabelWidth">
            <el-select v-model="userForm.ks" placeholder="请选择" disabled multiple>  
            <el-option
                v-for="item in ks"
                :key="item.key"
                :label="item.value"
                :value="item">
            </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="所属组" :label-width="formLabelWidth">
            <el-select v-model="userForm.groups" multiple placeholder="请选择" disabled>
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
        <el-button @click="cancelCopy()">取 消</el-button>
        <el-button type="primary" @click="copyUser(userForm)">确 定</el-button>
        </div>
    </el-dialog>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    name: 'copy',
    template: '<copy/>',
    computed:{
        ...mapGetters({
            allHos:'allhos',
            groups:'groups',
            userForm:'currentUser',
            // ks:'allKS',
            ks:'drillHos',
            copy:'copy',
            search:"search"
        }),
    },
    methods: {
        copyUser:function(userForm){
            this.userName = location.search.substring(10)
            if(userForm.password&&userForm.name){
            this.dialogFormVisible = false
            this.pageNum = this.$store.getters.page
            this.$store.dispatch('postCopyUser',{user:userForm,num:this.pageNum,username:this.userName,searchName:this.search.name,
                success:()=>{
                        this.$message({
                            type: 'success',
                            message: this.copy.status
                        })
                        },
                fail:()=>{
                    this.$message({
                        type: 'error',
                        message: this.copy.status
                    })
                }
            })
            this.$message({
                type: 'success',
                message: '复制成功!'
            })}
            else{
                this.$message({
                    type: 'error',
                    message: '请确认用户名和密码是否正确填写!'
                })
            }
        },
        cancelCopy:function(){
            this.dialogFormVisible=false
            this.$message({
                type: 'info',
                message: '复制取消!'
            })
        },
        getDeparts:function(value){
            this.$store.dispatch("drillHos",value)
        }
    },
    data () {
    return {
        dialogTableVisible: false,
        dialogFormVisible: false,
        userFormm: {
            name: '',
            password: '',
            confirmPassword:'',
            description: '',
            enable: '',
            province: '',
            city: '',
            net: null,
            groups: [
            ]
        },
        formLabelWidth: '100px',
        rules: {
            name: [
                { required: true, message: '请输入用户名称', trigger: 'blur' }
            ],
            password: [
                { required: true, message: '请输入用户密码' }
            ]
        },
        pageNum:0,
        userName:''
    }
    }
}
</script>
<style scoped>
.copyUserAdmin{
    display:inline-block;
}
</style>  