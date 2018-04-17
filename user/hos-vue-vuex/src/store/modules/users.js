import dataapi from '../../api/dataapi.js'
import * as types from '../mutation-types'
import * as API from '../../api/hos/api.js'

const state = {
    all:[],
    pureAll:[],
    size:0,
    create:{
        user:{},
        status:null
    },
    update:{
        user:{},
        status:null
    },
    copy:{
        user:{},
        status:null
    },
    turnon:{
        name:'',
        url:'',
        status:null
    },
    turnoff:{
        name:'', 
        url:'',
        status:null
    },
    currentUser:{},
    currentPage:1,
    allHos:[],
    allDeparts:[],
    curDeparts:[],
    groups:[],
    // tempFydm:0,
    allKS:[],
    currentUser:{
        name:"bitester3",
        password:"bitester2",
        description:"test user2",
        enable:"N",
        manager:"N",
        fy:[{"key":"2","value":"慈林医院"},{"key":"3","value":"慈溪市第三人民医院"}],
        ks:[{"key":"2_202","value":"全科门诊1","fyKey":"2"},{"key":"3_1113_OLD","value":"大通全科","fyKey":"3"},{"key":"3_1114_OLD","value":"针推科","fyKey":"3"}],
        groups:[{"key":"BIConsumers","value":"BIConsumers"},{"key":"FYLevelUsers","value":"FYLevelUsers"},{"key":"BIAuthors","value":"BIAuthors"},{"key":"QuLevelUsers","value":"QuLevelUsers"}]}
    ,
}

const getters = {
    currentUser:state=>state.currentUser,
    allUsers: state => {   
        for(var i=0;i<state.all.length;i++){
            if(typeof state.all[i].fy!='string'){
                var arr = state.all[i].fy
                var fyArr = []
                if(typeof arr == 'object'){
                for(var j=0;j<arr.length;j++){

                        fyArr.push(arr[j].value)
                    }
                }
                state.all[i].fy = fyArr.join('，')
            } 
        }
        for(var m=0;m<state.all.length;m++){
            var arr1 = state.all[m].ks
            var ksArr = []
                for(var n=0;n<arr1.length;n++){
                    ksArr.push(arr1[n].value) 
            }
            state.all[m].ks = ksArr.join('，')
                // ksArr.join(',')
        }
        for(var i=0;i<state.all.length;i++){
            var arr = state.all[i].groups
            var groupArr = []
            for(var j=0;j<arr.length;j++){
                groupArr.push(arr[j].value)
            }
            state.all[i].groups = groupArr.join('，')
        }
        return state.all
    },
    allPureUsers:state=>{
        return state.pureAll
    },
    userSize: state => state.size,
    create: state => state.create,
    update: state => state.update,
    copy: state => state.copy,
    turnon: state => state.turnon,
    turnoff: state => state.turnoff,
    page:state => state.currentPage,
    allhos:state=>state.allHos,
    departs:state=>state.curDeparts,
    groups:state=>state.groups,
    allDeparts:state=>state.allDeparts,
    allKS:state=>state.allKS
}

const actions = {
    /*获取当前用户数据*/
    getCurrentUser({commit},name){
        dataapi.getData(API.Ip.hosDev + API.Get.name+name,(user)=>{
           console.log(user)
            commit(types.GET_CURRENT_USER,{user})
        })
    },
    /*获取全部用户的数据*/
    getAllUsers({commit},url){
        dataapi.getData(url,(users)=>{
            commit(types.RECEIVE_USERS,{users})
        })
    },
    getAllPureUsers({commit},url){
        dataapi.getData(url,(users)=>{
            commit(types.RECEIVE_PURE_USERS,{users})
        })
    },
    /*获取用户总数，分页做准备*/
    getUsersSize({commit}){
        dataapi.getData((API.Ip.hosDev + API.Get.size),(size)=>{
            commit(types.RECEIVE_USERS_SIZE,{size})
        })
    },
    /*新增用户*/
    postCreatUser({commit,state},user){
        // const savedUser = state.create.user
        commit(types.CREATE_USER_REQUEST)
        dataapi.postData(
            (API.Ip.hosDev + API.Post.create),
            user,
            () => {
                commit(types.CREATE_USER_SUCCESS,{user})
            },
            () => commit(types.CREATE_USER_FAILURE,{user})
        )
    },
    /*更新用户*/
    postUpdateUser({commit,state},user){
        commit(types.UPDATE_USER_REQUEST)
        dataapi.postData(
            (API.Ip.hosDev + API.Post.update),
            user,
            () => {
                commit(types.UPDATE_USER_SUCCESS,{user})
            },
            () => commit(types.UPDATE_USER_FAILURE,{user})
        )
    },
    /*复制用户*/
    postCopyUser({commit,state},user){
        commit(types.COPY_USER_REQUEST)
        dataapi.postData(
            (API.Ip.hosDev + API.Post.create),
            user,
            () => {
                commit(types.COPY_USER_SUCCESS,{user})
            },
            () => commit(types.COPY_USER_FAILURE,{user})
        )
    },
    /*启用禁用用户*/
    postTurnOnUser({commit},turnon){
        commit(types.TURNON_USER_REQUEST)
        dataapi.postData(
            turnon.url,
            null,
            () => {
                commit(types.TURNON_USER_SUCCESS,{turnon})
                dataapi.getData(API.Ip.hosDev+'/user/q/user?currentPage='+turnon.num+'&pageSize=10&&description&province&city',(users)=>{
                    commit(types.RECEIVE_USERS,{users})
                    commit(types.RECEIVE_PURE_USERS,{users})
                })
            },
            () => {
                commit(types.TURNON_USER_FAILURE,{turnon})
            }
        )
    },
    /*当前页*/
    updateCurrentPage({commit},pageNum){
        commit(types.UPDATE_CURRENT_PAGE,{pageNum})
    },
    /*所有分院*/
    getAllHospital({commit}){
        dataapi.getData(API.Ip.hosDev + API.Get.fydm,(allHos)=>{
            commit(types.GET_ALL_HOS,{allHos})
        })
    },
    /*当前科室*/
    // getDepartment({commit,state},fydm){
    //     if(state.tempFydm != fydm){
    //         dataapi.getData(API.Ip.hosDev + API.Get.ksdm+fydm,(allDeparts)=>{
    //             commit(types.GET_SOME_DEPARTS,{allDeparts})
    //         })
    //         state.tempFydm = fydm
    //     }
    // },
    /*所有组*/
    getGroups({commit}){
        dataapi.getData(API.Ip.hosDev + API.Get.group,(allGroups)=>{
            commit(types.GET_ALL_GROUPS,{allGroups})
        })
    },
    /*所有科室*/
    getAllDeparts({commit}){
        dataapi.getData(API.Ip.hosDev + API.Get.ksdm,(allks)=>{
            commit(types.GET_ALL_KS,{allks})
        })
    },
    /*查询结果*/
    searchResult({commit},url){
        dataapi.getData(url,(users)=>{
            commit(types.SEARCH_RESULT,{users})
        })
    }
}

const mutations = {
    [types.GET_CURRENT_USER](state,{user}){
        state.currentUser = user
    },
    [types.RECEIVE_USERS](state,{users}){
        // state.pureAll = users
        state.all = users
    },
    [types.RECEIVE_PURE_USERS](state,{users}){
        state.pureAll = users
        // state.all = users
    },
    [types.RECEIVE_USERS_SIZE](state,{size}){
        state.size = size
    },

    [types.CREATE_USER_REQUEST](state){
        state.create.user = {}
        state.create.status = null
    },
    [types.CREATE_USER_SUCCESS](state,{user}){
        state.create.user = user        
        state.create.status = 'create successful'
    },
    [types.CREATE_USER_FAILURE](state,{user}){
        state.create.user = user
        state.create.status = 'create failed'
    },

    [types.UPDATE_USER_REQUEST](state){
        state.update.user = {}
        state.update.status = null
    },
    [types.UPDATE_USER_SUCCESS](state,{user}){
        // state.all = users
        state.update.user = user        
        state.update.status = 'update successful'
    },
    [types.UPDATE_USER_FAILURE](state,{user}){
        state.update.user = user
        state.update.status = 'update failed'
    },

    
    [types.COPY_USER_REQUEST](state){
        state.copy.user = {}
        state.copy.status = null
    },
    [types.COPY_USER_SUCCESS](state,{user}){
        state.copy.user = user        
        state.copy.status = 'copy successful'
    },
    [types.COPY_USER_FAILURE](state,{user}){
        state.copy.user = user
        state.copy.status = 'copy failed'
    },

    [types.TURNON_USER_REQUEST](state){
        state.turnon.url = ''
        state.turnon.name = ''
        state.turnon.status = null
    },
    [types.TURNON_USER_SUCCESS](state,{turnon}){
        state.turnon.url = turnon.url
        state.turnon.name = turnon.name
        state.turnon.status = 'turn on successful'
    },
    [types.TURNON_USER_FAILURE](state,{turnon}){
        state.turnon.url = turnon.url
        state.turnon.name = turnon.name
        state.turnon.status = 'turn on failed'
    },

    // [types.CURRENT_UPDATE_USER](state,{currentUser}){
    //     state.currentUser = currentUser
    // },

    [types.UPDATE_CURRENT_PAGE](state,{pageNum}){
        state.currentPage = pageNum
    },

    [types.GET_ALL_HOS](state,{allHos}){
        state.allHos = allHos
    },
    // [types.GET_SOME_DEPARTS](state,{allDeparts}){
    //     allDeparts.map((x)=>{state.curDeparts.push(x)})
    // },
    [types.GET_ALL_GROUPS](state,{allGroups}){
        state.groups = allGroups
    },
    [types.SEARCH_RESULT](state,{users}){
        state.all = users
    },
    [types.GET_ALL_KS](state,{allks}){
        state.allKS = allks
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}