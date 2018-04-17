import dataapi from '../api/dataapi.js'
import * as types from './mutation-types'
import * as API from '../api/hos/api.js'
function refreshPage({commit},num,user,name){
    var url = ''
    if(typeof name!='undefined'){
        url = API.Ip.hosDev+'user/q/user?currentPage='+num+'&pageSize=10'+"&user="+user+"&name="+name
    }else{
        url = API.Ip.hosDev+'user/q/user?currentPage='+num+'&pageSize=10'+"&user="+user
    }
    dataapi.getData(url,(users)=>{
        commit(types.RECEIVE_USERS,{users})
        commit(types.RECEIVE_PURE_USERS,{users})
    })
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
    getUsersSize({commit},payload){
        // payload = payload ||{url:API.Ip.hosDev + API.Get.size,search:{}}
        var url = payload.url
        var user = payload.search
        commit(types.RECEIVE_SEARCH_USER,{user})
        dataapi.getData(url,(size)=>{
            commit(types.RECEIVE_USERS_SIZE,{size})
        })
    },
    /*新增用户*/
    postCreateUser({commit,state},payload){
        console.log(payload)
        var user = payload.user
        commit(types.CREATE_USER_REQUEST)
        dataapi.postData(
            (API.Ip.hosDev + API.Post.create),
            user,
            (res) => {
                commit(types.CREATE_USER_SUCCESS)
                payload.success()
                refreshPage({commit},payload.num,payload.username)                
            },
            (err) => {
                commit(types.CREATE_USER_FAILURE,{err})
                payload.fail()
            }
        )
    },
    /*更新用户*/
    postUpdateUser({commit,state},payload){
        var user = payload.user        
        commit(types.UPDATE_USER_REQUEST)
        dataapi.postData(
            (API.Ip.hosDev + API.Post.update),
            user,
            (res) => {
                commit(types.UPDATE_USER_SUCCESS)
                payload.success()
                refreshPage({commit},payload.num,payload.username,payload.searchName)
            },
            (err) => {
                commit(types.UPDATE_USER_FAILURE,{err})
                payload.fail()
            }
        )
    },
    /*复制用户*/
    postCopyUser({commit,state},payload){
        console.log(payload)
        var user = payload.user
        commit(types.COPY_USER_REQUEST)
        dataapi.postData(
            (API.Ip.hosDev + API.Post.create),
            payload.user,
            () => {
                commit(types.COPY_USER_SUCCESS)
                payload.success()
                refreshPage({commit},payload.num,payload.username,payload.searchName)                
            },
            (err) => {
                commit(types.COPY_USER_FAILURE,{err})
                payload.fail()                
            }
        )
    },
    /*启用禁用用户*/
    postTurnOnUser({commit},turnon){
        console.log(turnon)
        commit(types.TURNON_USER_REQUEST)
        dataapi.postData(
            turnon.url,
            null,
            () => {
                // commit(types.TURNON_USER_SUCCESS,{turnon})
                refreshPage({commit},turnon.num,turnon.username,turnon.searchName)
            },
            () => {
                // commit(types.TURNON_USER_FAILURE,{turnon})
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
    getDepartments({commit,state},fydm){
        // if(state.tempFydm != fydm){
            state.curDeparts = []            
            dataapi.getData(API.Ip.hosDev + API.Get.ksdm+fydm,(allDeparts)=>{
                commit(types.GET_SOME_DEPARTS,{allDeparts})
            })
            // state.tempFydm = fydm
        // }
    },
    /*所有组*/
    getGroups({commit},userName=''){
        dataapi.getData(API.Ip.hosDev + API.Get.group+'?user='+userName,(allGroups)=>{
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
    },
    limitAdmin({commit},name){
        dataapi.getData(API.Ip.hosDev + API.Get.limit+name,(adminHos)=>{
            commit(types.ADMIN_LIMIT,{adminHos})
        })
    },
    drillHos({commit},hoss){
        dataapi.postData(
            API.Ip.hosDev + API.Post.ks,
            hoss,
            (res) => {
                var drillHos = res.data
                commit(types.DRILL_HOS,{drillHos})
            }
        )
    }
}
export default actions