var nativeMap = function(arr,callback){
    return arr.map(callback)
}
var forEach = function(arr){
    var ret = [];
    arr.forEach((v)=>{ret.push(v)})
    return ret
}
var customMap = function(arr,callback){
    var ret = [];
    for(var i=0;i<arr.length;i++){
        ret.push(callback(arr[i],i,arr));
    }
    return ret
}

var run = function(name,times,fn,arr,callback){
    var start = (new Date()).getTime();
    for(var i=0;i<times;i++){
        fn(arr,callback)
    }
    var end = (new Date()).getTime()
    console.log("Running %s %d times cost %d ms",name,times,end-start)
}

var callback = function(item){
    return item
}

run('map    ',1000000,nativeMap,[0,1,2,3,5,6],callback)
run('forEach',1000000,forEach,[0,1,2,3,5,6],callback)
run('for    ',1000000,customMap,[0,1,2,3,5,6],callback)