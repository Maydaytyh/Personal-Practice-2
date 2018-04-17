import * as types from './mutation-types'
const mutations = {
    [types.GET_CURRENT_USER](state,{user}){
        state.currentUser = user
    },
    [types.RECEIVE_USERS](state,{users}){
        state.all = users
    },
    [types.RECEIVE_PURE_USERS](state,{users}){
        state.pureAll = users
    },
    [types.RECEIVE_USERS_SIZE](state,{size}){
        state.size = size
    },
    [types.RECEIVE_SEARCH_USER](state,{user}){
        state.search = user
    },
    [types.CREATE_USER_REQUEST](state){
        state.create.status = null
    },
    [types.CREATE_USER_SUCCESS](state){
        state.create.status = "创建成功！"
    },
    [types.CREATE_USER_FAILURE](state,{err}){
        state.create.status = err.response.data.errMsg
    },
    [types.UPDATE_USER_REQUEST](state){
        state.update.status = null
    },
    [types.UPDATE_USER_SUCCESS](state){
        state.update.status = '更新成功！'
    },
    [types.UPDATE_USER_FAILURE](state,{err}){
        state.update.status = err.response.data.errMsg
    },
    [types.COPY_USER_REQUEST](state){
        state.copy.status = null
    },
    [types.COPY_USER_SUCCESS](state){
        state.copy.status = '复制成功！'
    },
    [types.COPY_USER_FAILURE](state,{err}){
        state.copy.status = err.response.data.errMsg
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
    [types.UPDATE_CURRENT_PAGE](state,{pageNum}){
        state.currentPage = pageNum
    },

    [types.GET_ALL_HOS](state,{allHos}){
        state.allHos = allHos
    },
    [types.GET_SOME_DEPARTS](state,{allDeparts}){
        allDeparts.map((x)=>{state.curDeparts.push(x)})
    },
    [types.GET_ALL_GROUPS](state,{allGroups}){
        state.groups = allGroups
    },
    [types.SEARCH_RESULT](state,{users}){
        state.all = users
    },
    [types.GET_ALL_KS](state,{allks}){
        state.allKS = allks
    },
    [types.ADMIN_LIMIT](state,{adminHos}){
        state.currentAdminHoss = adminHos
    },
    [types.DRILL_HOS](state,{drillHos}){
        state.drillHos = drillHos
    }
}

export default mutations