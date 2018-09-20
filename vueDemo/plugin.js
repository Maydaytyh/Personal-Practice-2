MyPlugin.install = function (Vue, options) {
    //1. 添加全局的方法或者属性
    Vue.myGlobalMethod = function () {
        //一些逻辑
    }
    //2. 添加一个全局的asset
    Vue.directive('my-directive', {
        bind(el, binding, vnode, oldVnode) {
            //一些逻辑
        }
    })
    //3. 注入一些组件选项
    Vue.mixin({
        created: function () {
            // something logic...
        }
    })
    //4. 添加一个实例方法
    Vue.prototype.$myMethod = function (methodOptions) {
        //一些逻辑
    }
}