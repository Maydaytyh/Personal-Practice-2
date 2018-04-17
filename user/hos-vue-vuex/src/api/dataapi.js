import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json';

export default {
    getData(url,callback){
        axios.get(url)
            .then(res=>{callback(res.data)})
    },
    postData(url,obj,callbackSuccess,callbackError){
        obj = obj || null
        axios.post(url,obj)
            .then(callbackSuccess)
            .catch(callbackError)
    }
}