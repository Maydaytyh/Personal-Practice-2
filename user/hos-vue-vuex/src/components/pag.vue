<template>
<div class="pag">
    <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page.sync="currentPage"
    :page-size="pageSize"
    layout="prev, pager, next, jumper"
    :total="size">
    </el-pagination>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
import * as API from '../api/hos/api.js'
export default {
    name: 'pag',
    template: '<pag/>',
    created(){
        this.userName = location.search.substring(10)
        this.currentUrl=API.Ip.hosDev+"user/q/user?currentPage=1&pageSize=10&user="+this.userName
        this.$store.dispatch('getAllUsers',this.currentUrl)   
        this.$store.dispatch('getAllPureUsers',this.currentUrl)             
        this.searchUser = API.Ip.hosDev+'user/q/size?user='+this.userName
        this.$store.dispatch('getUsersSize',{url:this.searchUser,search:{
                // name:this.inputName,
                // description:this.inputDescription,
                // fydm:this.inputProvince,
                // ksdm:this.inputCity
        }})
    },
    computed:mapGetters({
        size:'userSize',
        search:'search',
        currentPage:'page'
    }),
    data () {
        return {
            msg: 'Welcome to Your Vue.js App',
            // currentPage: 1,
            pageSize:10,
            currentUrl: '',
            userName:''
        }
    },
    methods:{
        handleSizeChange (val) {
            console.log(`每页 ${val} 条`)
        },
        handleCurrentChange (val) {
            this.$store.dispatch('updateCurrentPage',val)
            this.currentPage = val
            this.currentUrl = API.Ip.hosDev +"user/q/user?currentPage="+ this.currentPage +"&pageSize=" + this.pageSize+"&user="+this.userName
            if(Object.keys(this.search).length==0){
                this.$store.dispatch('getAllUsers',this.currentUrl)
            }else{                
                this.currentUrl = API.Ip.hosDev +"user/q/user?currentPage="+ this.currentPage +"&pageSize=" + this.pageSize +'&name='+this.search.name+'&description='+this.search.description+'&fydm='+this.search.fydm+'&ksdm='+this.search.ksdm+"&user="+this.userName
                this.$store.dispatch('searchResult',this.currentUrl)                
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    
</style>