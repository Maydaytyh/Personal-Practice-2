import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { updater } from '../actions';
import { bindActionCreators } from 'redux';

import {Button,Input,Select,Dialog,Form} from 'element-react';
// import UmButton from '../../components/button.js';
// import UmForm from '../../components/form/form.js';
import Config from '../api/config';
import API from '../api/index';
// import { managerStore } from '../store/index';


class Update extends Component {
	constructor (props) {
		super(props);
		this.state = {
			dialogVisible: false,
			form: {
			  name: '',
			  description:'',
			  password:'',
			  status:'',
			  province:'',
			  city:'',
			  net:'',
			  groups:[]
			},
			validate:{
				password:''
			},
			data:{
				provinces:[{
					value: '选项1',
					label: '黄金糕'
				  }, {
					value: '选项2',
					label: '双皮奶'
				  }],
				cities:[{
					value: '选项1',
					label: '黄金糕'
				  }, {
					value: '选项2',
					label: '双皮奶'
				  }],
				nets:[{
					value: '选项1',
					label: '黄金糕'
				  }, {
					value: '选项2',
					label: '双皮奶'
				  }],
				groups:[{
					value: '选项1',
					label: '黄金糕'
				  }, {
					value: '选项2',
					label: '双皮奶'
				  }]
			}
		  };
		this.emitUserForm = this.emitUserForm.bind(this);
		this.getRemoteData = this.getRemoteData.bind(this);
		this.setDialogVisible = this.setDialogVisible.bind(this);
		this.handleProvinceSelect = this.handleProvinceSelect.bind(this);
		this.filteCitiesByProvince = this.filteCitiesByProvince.bind(this);
		this.handleCitySelect = this.handleCitySelect.bind(this);
		this.filteNetsByCity = this.filteNetsByCity.bind(this);
		this.postRequestData = this.postRequestData.bind(this);
		this.state.data.provinces = this.props.provinces;
		this.state.data.groups = this.props.groups;
		this.state.form = this.props.user;	
		// console.log(this);	
	}
	setDialogVisible(status){
		this.setState({
			dialogVisible:status
		});
	}
	// componentWillMount(){
	// 	// console.log('componentWillMount',managerStore.getState());		
	// 	// this.searchUser();			
	// 	// this.getProvincesData();
	// 	// this.getGroupsData();
	// }
	// componentDidMount(){
	// 	// console.log('componentDidMount',managerStore.getState());		
	// 	// 初始化查询
	// 	// this.searchUser();	
	// 	// this.getProvincesData();
	// 	// this.getGroupsData();
	// }
	// componentWillReceiveProps(nextProps){
	// 	// console.log('componentWillReceiveProps',managerStore.getState());
	// 	// const stateObj = managerStore.getState();
	// 	// const initialProvinceData = stateObj.searchResult.initialData.provincesData;
	// 	// const initialGroupsData = stateObj.searchResult.initialData.groupsData;
	// 	// // this.setState({
	// 	// // 	data:initialProvinceData
	// 	// // });	
	// 	// this.state.data.provinces = initialProvinceData;
	// 	// this.state.data.groups = initialGroupsData;	
	// 	// const url = Config.devApi+'/user/q/province';
	// 	// API.getData(url,this.getProvinceData);	

	// }
	// shouldComponentUpdate(nextProps, nextState){
	// 	// console.log('shouldComponentUpdat',managerStore.getState());
	// 	// return true;
		
	// }
	// componentWillUpdate(nextProps, nextState){
	// 	// console.log(this.state.form);
	// 	// console.log('componentWillUpdate',managerStore.getState());
		
	// }
	// componentDidUpdate(prevProps, prevState){
	// 	// console.log(this.state.form);		
	// 	// console.log('componentDidUpdate',managerStore.getState());
		
	// }
	getRemoteData (data) {
		this.state.data = data; 
	}
	postRequestData (data) {
		this.state.form = data; 
		// managerStore.dispatch({state:this.state, type: 'UPDATE'});						
	}
	emitUserForm () {
		this.setDialogVisible(false);
		const url = Config.devApi+'/user?update';

		// API.getData(url,this.getRemoteData);
		API.postData(url,this.state.form,this.postRequestData(this.state.form));
		
		// managerStore.dispatch({state:this.state, type: 'UPDATE'});
		// console.log('弹出用户信息表单');
		// console.log(creatorStore);

	}
	handleChange(key,event) {
		const value = event;
		this.state.form[key] = value;
		this.forceUpdate();
	  }
	  handleGroupsChange(key,event) {
		const value = event;
		this.state.form[key] = [];
		this.state.form[key].push(value);
		this.forceUpdate();
	  }
	  handleProvinceSelect(key,event){
		// this.state.data.cities.splice(0,this.state.data.cities.length);
		// this.forceUpdate(()=>{this.state.data.cities=[];});
		// this.forceUpdate(()=>{this.state.data.city='';});
		// console.log(this.state.data.cities);
		const value = event;
		this.state.form[key] = value;
		this.forceUpdate();
		const url = Config.devApi+'/user/q/city?province='+value;
		API.getData(url,this.filteCitiesByProvince);		
	  }
	  filteCitiesByProvince(data){
		this.state.data.cities = data;
		this.forceUpdate();
	}
	handleCitySelect(key,event){
		// this.state.data.cities.splice(0,this.state.data.cities.length);
		// this.forceUpdate(()=>{this.state.data.cities=[];});
		// this.forceUpdate(()=>{this.state.data.city='';});
		// console.log(this.state.data.cities);
		const value = event;
		this.state.form[key] = value;
		this.forceUpdate();
		const url = Config.devApi+'/user/q/net?city='+value;
		API.getData(url,this.filteNetsByCity);		
	  }
	  filteNetsByCity(data){
		this.state.data.nets = data;
		this.forceUpdate();
	}
	render(){
		return (
			<div className="Update display-in-one-line">
				<div className="container">
					<div className="row">
						<Button onClick={this.setDialogVisible.bind(this,true)} type="primary">更新</Button>
						{/* <Dialog
							title="用户信息"
							visible={ this.state.dialogVisible }
							onCancel={this.setDialogVisible.bind(this,false)}
						>
							<Dialog-Body className="dialog-footer">
								<Form model={this.state.form} labelWidth="100">
									<Form.Item label="用户名" >
										<Input value={this.state.form.name} onChange={this.handleChange.bind(this,'name')}></Input>
									</Form.Item>
									<Form.Item label="用户说明" >
										<Input value={this.state.form.description} onChange={this.handleChange.bind(this,'description')}></Input>
									</Form.Item>
									<Form.Item label="用户口令" >
										<Input value={this.state.form.password} onChange={this.handleChange.bind(this,'password')}></Input>
									</Form.Item>
									<Form.Item label="确认口令" >
										<Input value={this.state.validate.password} ></Input>
									</Form.Item>
									<Form.Item label="启用状态">
										<Select value={this.state.form.status} placeholder="请选择状态" onChange={this.handleChange.bind(this,'status')}>
											<Select.Option label="开启" value='Y'></Select.Option>
											<Select.Option label="关闭" value='N'></Select.Option>
										</Select>
									</Form.Item>
									<Form.Item label="可查省份">

										<Select value={this.state.form.province} onChange={this.handleProvinceSelect.bind(this,'province')}>
											{
												this.state.data.provinces.map(el => {
													return <Select.Option key={el.value} label={el.label} value={el.label} />;
												})
											}
										</Select>
									</Form.Item>
									<Form.Item label="可查城市">

										<Select value={this.state.form.city} onChange={this.handleCitySelect.bind(this,'city')}>
											{
												this.state.data.cities.map(el => {
													return <Select.Option key={el.value} label={el.label} value={el.label} />;
												})
											}
										</Select>
									</Form.Item>
									<Form.Item label="可查站点">

										<Select value={this.state.form.net} onChange={this.handleChange.bind(this,'net')}>
											{
												this.state.data.nets.map(el => {
													return <Select.Option key={el.value} label={el.label} value={el.label} />;
												})
											}
										</Select>
									</Form.Item>
									<Form.Item label="所属组">

										<Select value={this.state.form.groups} onChange={this.handleGroupsChange.bind(this,'groups')}>
											{
												this.state.data.groups.map(el => {
													return <Select.Option key={el.value} label={el.label} value={el.label} />;
												})
											}
										</Select>
									</Form.Item>
								</Form>
							</Dialog-Body>

							<Dialog-Footer className="dialog-footer">
								<Button onClick={this.setDialogVisible.bind(this,false)}>取 消</Button>
								<Button type="primary" onClick={this.emitUserForm}>确 定</Button>
							</Dialog-Footer>
						</Dialog> */}
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state){
	return state;
	// return { todos: state.todos }
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({ updater },dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Update);