var UJS = function(){
    this.version="0.0.1";
};
UJS.prototype={
    _checkType:function(data){
        if(typeof data=="string")
        {
            console.log("字符串字面量");
        }
        else if(typeof data=="number")
        {
            console.log("数值字面量")
        }
        else if(typeof data=="boolean")
        {
            console.log("布尔值字面量");
        }
        else if(typeof data=="undefined")
        {
            console.log("undefined特殊类型");
        }
        else if(data instanceof Array)
        {
            console.log("数组对象子类型");
        }
        else if(data instanceof Function)
        {
            console.log("函数对象子类型");
        }
        else if(data instanceof Date)
        {
            console.log("日期对象子类型");
        }
        else if(data instanceof RegExp)
        {
            console.log("正则对象子类型");
        }
        else if(data instanceof Error)
        {
            console.log("错误对象子类型");
        }
        else if(Object.prototype.toString.call(data)=="[object Object]")
        {
            console.log("对象类型");
        }
        else if(Object.prototype.toString.call(data)=="[object Null]")
        {
            console.log("null特殊类型");
        }
        else if(Object.prototype.toString.call(data)=="[object Promise]")
        {
            console.log("promise类型");
        }
        else{
            console.log("未知类型")
        }
    },
    _isArray:function(arr){
        var toString = Object.prototype.toString
        return toString.call(arr) === "[object Array]"
    },
    _isArrayHasElement:function(arr){
        return UJS.prototype._isArray(arr) && arr.length>0
    },
    _isObject:function(obj){
        return obj !== null && typeof obj === 'object'
    },
    _isPromise(val){
        return val && typeof val.then === 'function'
    },
    _arraySort:function(arr){
        arr = arr ||
        arr.sort((x,y)=>(x>y));
        return arr;
    },
    _arrNew : [],
    _arrayDinstinct:function(arr){

        for(var i=0;i<arr.length;i++){
            if(arr[i] instanceof Object && Object.prototype.toString.call(arr[i])!=="[object Null]"){
                if(Object.prototype.toString.call(arr[i])=="[object Object]"){
                    arr.sort((x,y)=>(x.time>y.time));
                    arr.reduce(function(accumulator, currentValue, currentIndex, array){
                        if(accumulator.time === currentValue.time){
                            array[currentIndex-1]=null;
                        }
                        //console.log(accumulator);
                        return currentValue;
                    });
                    return _arrNew = arr.filter((subarr)=>{return subarr!=null})
                }else{
                    console.log(new Error("UJI暂不支持当前类型数组去重。"))
                }
            }else{
                return [...new Set(this._arraySort(arr))];
            }
        }
        //return [...new Set(arr)];
    },
    _deepCopyObj:function(original){
        let copy = {}
        Object.keys(original).forEach(key=>{
            copy[key] = original[key]
        })
        return copy
    },
    _resolveUrl:function(Url){
        "use strict"

        //'http://m.manaowan.com/index.html?a=1&b=2&c=&d=xxx&'→"a=1&b=2&c=&d=xxx&"
        function getSearch(Url){
            let indexReg=/\?/
            let resultArr = indexReg.exec(Url)
            let searchStr = Url.substr(resultArr['index']+1)
            return searchStr
        }
        var mnwUrl = 'http://m.manaowan.com/common.html?a=1&b=2&c=&d=xxx&'
        var searchResult = getUrlParameter(mnwUrl)

        //"a=1&b=2&c=&d=xxx&"→["a=1","b=2","c=","d=xxx"]
        function getPara(result){
            if(result!==''){
                let paraReg=/\&/g
                let paraArr=[],
                    para='';
                let circle = ''
                paraArr = paraReg.exec(result)
                para = result.substring(0,paraArr.index)
                arr.push(para)
                circle = result.substr(paraArr['index']+1)
                getPara(circle)
            }else{
                console.log("遍历结束")
            }
        }
        var arr = []
        getPara(searchResult)

        //["a=1","b=2","c=","d=xxx"]→{"a":"1","b":"2","c":"","d":"xxx"}
        var obj = {}
        for(let i =0 ;i<arr.length;i++){
            let mid = arr[i]
            let key = mid.substring(0,mid.indexOf("="))
            let value = mid.substr(mid.indexOf("=")+1)
            obj[key] = value
        }
        return JSON.stringify(obj)
    },
    _cached:function(fn) {
        var cache = Object.create(null);
        return (function cachedFn (str) {
          var hit = cache[str];
          return hit || (cache[str] = fn(str))
        })
      },
    _camlize:function(str){
        //return a new camlized string
        /*'hello-world-javascript' → 'helloWorldJavascript'*/
        var camelizeRE = /-(\w)/g
        var result = str.replace(camelizeRE,function(_,w,offset,str){/*Cannot use p2/p3/p4,only four key parameters:match,word(s),offset,str*/
            return w?w.toUpperCase():'';
            // return w?"-"+w.toUpperCase():'';
        })
        return result
    },
    _hyphenate:function(str){
        var hyphenateRE = /\B([A-Z])/g;
        return str.replace(hyphenateRE, function(_,c){
            return c?"-"+c.toLowerCase():''
        })
        //str.replace(hyphenateRE,"-$1").toLowerCase()
    },
    _hasOwn:function(obj,key){
        return Object.prototype.hasOwnProperty.call(obj,key)
    },
    _toArray: function(list, start) {
        start = start || 0;
        var i = list.length - start;
        var ret = new Array(i);
        while (i--) {
          ret[i] = list[i + start];
        }
        return ret
    },
    _getObjDetails:function(obj,getKey,getValue){
        // if(getKey&&getValue){
        //     return keysArr,valuesArr
        // }else{
        //     if(getKey&&!getValue){
        //         return keysArr
        //     }else if(!getKey&&getValue){
        //         return valuesArr
        //     }else{
        //         return []
        //     }
        // }
        var keysArr = [],valuesArr = [];
        var fullArr=[];
        for(var key in obj){
            keysArr.push(key)
            valuesArr.push(obj[key])
        }
        fullArr.push(keysArr)
        fullArr.push(valuesArr)
        return getKey&&getValue ? fullArr
               :getKey?keysArr
                :getValue?valuesArr
                :[]
    },
    _extendObj:function(extendedObj,sourceObj){
        for(var key in sourceObj){
            extendedObj[key] = sourceObj[key]
        }
        return extendedObj
    },
    _arrToObj:function(arr){
        var obj = {}
        for(var i = 0;i<arr.length;i++){
            obj[i]=arr[i]
        }
        return obj
    },
    _no:function(a,b,c){
        return false;
    },
    _identity:function(_){
        return _;
    },
    _howToView:function(){

    },
    _render:function(){

    },
    _getData:function(){

    },
    _setData:function(){

    },
    _arrMin:function(arr){
        var min = Math.min.apply(null,arr)
        var idx = arr.indexOf(min)
        var obj ={}
        obj.min = min
        obj.idx = idx
        return obj
    }
}

export default UJS

// var test=new UJS();
// test._checkType("a");
// test._arraySort([5,2,3]);
// test._arrayDinstinct([2,3,1]);
// test._arrayDinstinct([{time:1},{time:2},{time:4},{time:1}]);


// //绑定库中的方法到当前window,实现继承
// function camlize(str){
//     return UJS.prototype._camlize.call(this,str)
// }
// camlize("a-b-c-d-e-f-g-hijklmn")

// function hyphenate(str){
//     return UJS.prototype._hyphenate.apply(this,arguments)
// }
// hyphenate("regexpResult")

// /*Call own method test*/
// test._isArrayHasElement([1,2,3])
// /*Array-like object to Array test*/
// function toArray(){
//     function sum(foo,bar){
//         return [1,2,3]
//     }
//     // return sum(1,2)
//     return UJS.prototype._toArray(sum(1,2))
// }
// toArray()
// test._getObjDetails({foo:1,bar:2},true,true)
// test._getObjDetails({foo:1,bar:2},true,false)
// test._getObjDetails({foo:1,bar:2},false,true)
