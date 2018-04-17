import React,{Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { qurrier } from '../actions';

import { Button } from 'element-react';
import UmButton from '../components/button';
import UmInput from '../components/input';
// import './index.css';
// import Axios from 'axios';
import Config from '../api/config';
import API from '../api/index';
import { managerStore } from '../store/index';


class Retrive extends Component {
	constructor (props) {
		super(props);
		this.state = {
			name:'',
			description:'',
			province:'',
			city:'',
			retriveResult:[],
			initialData:{provincesData:[],groupsData:[]}
		};
		this.getRemoteData = this.getRemoteData.bind(this);
		this.searchUser = this.searchUser.bind(this);
		this.composeRetriveReq = this.composeRetriveReq.bind(this);
		this.getProvincesData = this.getProvincesData.bind(this);	
		this.getGroupsData = this.getGroupsData.bind(this);		
		
		this.saveProvincesToRedux = this.saveProvincesToRedux.bind(this);
		this.saveGroupsToRedux = this.saveGroupsToRedux.bind(this);
		
	}
	componentWillMount(){
		this.searchUser();			
	}
	componentDidMount(){
		// 初始化查询
		// this.searchUser();	
		// this.getProvincesData();
		// this.getGroupsData();
	}
	composeRetriveReq (level,value) {
		this.setState({
			[level]:value
		});
	}
	/**
	 * desc: 服务器查询数据函数
	 * @param {Array}
	 */
	getRemoteData (data) {
		// this.setState({
		// 	searchResult:data
		// });
		this.state.retriveResult = data;
		managerStore.dispatch({state:this.state, type: 'RETRIVE'});	
		// this.props.getState();	
	}
	/**
	 * desc: 查询功能事件处理函数
	 * @param {*} event 
	 */
	searchUser (event) {
		const name = this.state.name || '';
		const description = this.state.description || '';
		const province = this.state.province || '';
		const city = this.state.city || '';
		const url = Config.devApi+'/user/q/user?currentPage=1&pageSize=10'+'&name='+name+'&description='+description+'&province='+province+'&city='+city;
		// const url = Config.devApi;
		API.getData(url,this.getRemoteData);
		this.getProvincesData();
		this.getGroupsData();
	}
	getProvincesData(){
		const urlProvince = Config.devApi+'/user/q/province';
		API.getData(urlProvince,this.saveProvincesToRedux);
	}
	saveProvincesToRedux(data){
		this.state.initialData.provincesData = data; 
		managerStore.dispatch({state:this.state, type: 'RETRIVE'});
	}
	getGroupsData(){
		const urlGroups = Config.devApi+'/user/q/group';
		API.getData(urlGroups,this.saveGroupsToRedux);		
	}
	saveGroupsToRedux(data){
		this.state.initialData.groupsData = data; 
		managerStore.dispatch({state:this.state, type: 'RETRIVE'});
	}
	render(){
		return (
			<div className="Retrive">
				<div className="container">
					<div className="row">
						<div className="col-md-2"><UmInput name="name" pipe={this.composeRetriveReq}></UmInput></div>
						<div className="col-md-2"><UmInput name="description" pipe={this.composeRetriveReq}></UmInput></div>
						<div className="col-md-2"><UmInput name="province" pipe={this.composeRetriveReq}></UmInput></div>
						<div className="col-md-2"><UmInput name="city" pipe={this.composeRetriveReq}></UmInput></div>
						<div className="col-md-2"><Button name="search" type="primary" onClick={this.searchUser}>查询</Button></div>
					</div>
				</div>
			</div>
		);
	}
}
function mapStateToProps(state) {
	return state;
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({ qurrier },dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Retrive);