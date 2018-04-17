const getters = {
    currentUser:state=>state.currentUser,
    // commonCurrentUser:state=>{ 
    //     const arr = []
    //     arr.push(state.currentUser)
    //     return arr
    // },
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
                if(fyArr.length==0){
                    fyArr.push('不限')
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
                if(ksArr.length==0){
                    ksArr.push('不限')
                }
            state.all[m].ks = ksArr.join('，')
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
    allKS:state=>state.allKS,
    search:state=>state.search,
    currentAdminHoss:state=>state.currentAdminHoss,
    drillHos:state=>state.drillHos
}
export default getters