import axios from 'axios';

export default {
	getData(url,callback){
		axios.get(url)
			.then((res)=>{console.log(res);callback(res.data);});
		// .catch((err)=>{throw Error(err);});
	},
	postData(url,obj,callbackSuccess,callbackError){
		axios.post(url,obj)
			.then(callbackSuccess)
			.catch(callbackError);
	}
};