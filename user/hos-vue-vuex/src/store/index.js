import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
const state = {
    all:[],
    pureAll:[],
    size:0,
    search:{},
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
    tempFydm:0,
    allKS:[],
    currentUser:{
        name:"bitester3",
        password:"bitester2",
        description:"test user2",
        enable:"N",
        manager:"N",
        fy:[{"key":"2","value":"XX医院"},{"key":"3","value":"XX市第三人民医院"}],
        ks:[{"key":"2_202","value":"XX门诊1","fyKey":"2"},{"key":"3_1113_OLD","value":"XX全科","fyKey":"3"},{"key":"3_1114_OLD","value":"XX科","fyKey":"3"}],
        groups:[{"key":"BIConsumers","value":"BIConsumers"},{"key":"FYLevelUsers","value":"FYLevelUsers"},{"key":"BIAuthors","value":"BIAuthors"},{"key":"QuLevelUsers","value":"QuLevelUsers"}]}
    ,
    currentAdminHoss:[],
    drillHos:[]
}

Vue.use(Vuex)

export default new Vuex.Store({
    state,
    actions,
    getters,
    mutations
})