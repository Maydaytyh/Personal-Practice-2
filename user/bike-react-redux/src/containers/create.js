import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { creator } from '../actions';
import { bindActionCreators,dispatch } from 'redux';

import {Button,Input,Select,Dialog,Form} from 'element-react';

import Config from '../api/config';
import API from '../api/index';
// import { managerStore } from '../store/index';


class Create extends Component {
	constructor (props) {
		super(props);
		this.state = {
			dialogVisible: false,
			form: {
			  name: '',
			  description:'',
			  password:'',
			  enable:'',
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
				  }, {
					value: '选项3',
					label: '蚵仔煎'
				  }, {
					value: '选项4',
					label: '龙须面'
				  }, {
					value: '选项5',
					label: '北京烤鸭'
				}],
				cities:[{
					value: '选项1',
					label: '黄金糕'
				  }, {
					value: '选项2',
					label: '双皮奶'
				  }, {
					value: '选项3',
					label: '蚵仔煎'
				  }, {
					value: '选项4',
					label: '龙须面'
				  }, {
					value: '选项5',
					label: '北京烤鸭'
				}],
				nets:[{
					value: '选项1',
					label: '黄金糕'
				  }, {
					value: '选项2',
					label: '双皮奶'
				  }, {
					value: '选项3',
					label: '蚵仔煎'
				  }, {
					value: '选项4',
					label: '龙须面'
				  }, {
					value: '选项5',
					label: '北京烤鸭'
				}],
				groups:[{
					value: '选项1',
					label: '黄金糕'
				  }, {
					value: '选项2',
					label: '双皮奶'
				  }, {
					value: '选项3',
					label: '蚵仔煎'
				  }, {
					value: '选项4',
					label: '龙须面'
				  }, {
					value: '选项5',
					label: '北京烤鸭'
				}]
			}
		  };
		this.emitUserForm = this.emitUserForm.bind(this);
		this.postRequestData = this.postRequestData.bind(this);
		this.setDialogVisible = this.setDialogVisible.bind(this);
		this.handleProvinceSelect = this.handleProvinceSelect.bind(this);
		this.filteCitiesByProvince = this.filteCitiesByProvince.bind(this);
		this.handleCitySelect = this.handleCitySelect.bind(this);
		this.filteNetsByCity = this.filteNetsByCity.bind(this);
		// this.composeFormReq = this.composeFormReq.bind(this);
		// this.handleInput = this.composeFormReq.bind(this);
		// this.handleInputChange = this.handleInputChange.bind(this);
	}

	// componentWillMount(){
	// 	const stateObj = managerStore.getState();
	// 	const initialProvinceData = stateObj.searchResult.initialData.provincesData;
	// 	const initialGroupsData = stateObj.searchResult.initialData.groupsData;
	// 	// this.setState({
	// 	// 	data:initialProvinceData
	// 	// });	
	// 	this.state.data.provinces = initialProvinceData;
	// 	this.state.data.groups = initialGroupsData;		
	// }
	componentDidMount(){
		// const stateObj = managerStore.getState();
		// const initialProvinceData = stateObj.searchResult.initialData.provincesData;
		// const initialGroupsData = stateObj.searchResult.initialData.groupsData;
		// // this.setState({
		// // 	data:initialProvinceData
		// // });	
		// this.state.data.provinces = initialProvinceData;
		// this.state.data.groups = initialGroupsData;		
		// console.log('componentDidMount',managerStore.getState().searchResult.initialData);
		
	}
	// componentWillReceiveProps(nextProps){
	// 	// console.log('componentWillReceiveProps',managerStore.getState().searchResult.initialData);
	// 	// const stateObj = managerStore.getState();
	// 	const initialProvinceData = stateObj.searchResult.initialData.provincesData;
	// 	const initialGroupsData = stateObj.searchResult.initialData.groupsData;
	// 	// this.setState({
	// 	// 	data:initialProvinceData
	// 	// });	
	// 	this.state.data.provinces = initialProvinceData;
	// 	this.state.data.groups = initialGroupsData;	
	// 	// const url = Config.devApi+'/user/q/province';
	// 	// API.getData(url,this.getProvinceData);	

	// }
	// shouldComponentUpdate(nextProps, nextState){
	// 	// console.log('shouldComponentUpdat',managerStore.getState().searchResult.initialData);
	// 	return true;
		
	// }
	// componentWillUpdate(nextProps, nextState){
	// 	// console.log(this.state.form);
	// 	// console.log('componentWillUpdate',managerStore.getState().searchResult.initialData);
		
	// }
	componentDidUpdate(prevProps, prevState){
		// console.log(this.state.form);		
		// console.log('componentDidUpdate',managerStore.getState().searchResult.initialData);
		
	}
	// componentWillUnmount(){
	// 	console.log('componentWillUnmount',managerStore.getState().searchResult.initialData);
		
	// }
	setDialogVisible(status){
		this.setState({
			dialogVisible:status
		});
	}

	postRequestData (data) {
		this.state.form = data; 
		managerStore.dispatch({state:this.state, type: 'CREATE'});						
	}
	emitUserForm () {
		this.setDialogVisible(false);
		const url = Config.devApi+'/user?add';
		API.postData(url,this.state.form,this.postRequestData(this.state.form));
		// console.log('弹出用户信息表单');
		// console.log(creatorStore);

	}
	// composeFormReq (key,value) {
	// 	this.state.form[key] = value;
	// 	// this.forceUpdate();
	// }
	// handleInput(event){
	// 	console.log(event);
	// }
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
			<div className="Create">
				<div className="container">
					<div className="row">
						<Button onClick={this.setDialogVisible.bind(this,true)} type="primary">新建</Button>
						<Dialog
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
									{/* <Form.Item label="确认口令" >
										<Input value={this.state.validate.password} onChange={this.handleInputChange.bind(this,'name')}></Input>
									</Form.Item> */}
									<Form.Item label="启用状态">
										<Select value={this.state.form.status} placeholder="请选择状态" onChange={this.handleChange.bind(this,'status')}>
											<Select.Option label="开启" value='Y'></Select.Option>
											<Select.Option label="关闭" value='N'></Select.Option>
										</Select>
									</Form.Item>
									<Form.Item label="是否管理员">
										<Select value={this.state.form.enable} placeholder="请选择状态" onChange={this.handleChange.bind(this,'enable')}>
											<Select.Option label="是" value='Y'></Select.Option>
											<Select.Option label="否" value='N'></Select.Option>
										</Select>
									</Form.Item>
									<Form.Item label="可查省份">
										{/* <Select value={this.state.form.province} placeholder="请选择省份" onChange={this.handleInputChange.bind(this,'province')}>
											<Select.Option label="浙江" value="hbs"></Select.Option>
											<Select.Option label="江苏" value="p979797"></Select.Option>
										</Select> */}
										<Select value={this.state.form.province} onChange={this.handleProvinceSelect.bind(this,'province')}>
											{
												this.state.data.provinces.map(el => {
													return <Select.Option key={el.value} label={el.label} value={el.label} />;
												})
											}
										</Select>
									</Form.Item>
									<Form.Item label="可查城市">
										{/* <Select value={this.state.form.city} placeholder="请选择城市" onChange={this.handleInputChange.bind(this,'city')}>
											<Select.Option label="杭州" value="hhs"></Select.Option>
											<Select.Option label="宁波" value="c-26-83-90-26-79-119-27-72-126"></Select.Option>
										</Select> */}
										<Select value={this.state.form.city} onChange={this.handleCitySelect.bind(this,'city')}>
											{
												this.state.data.cities.map(el => {
													return <Select.Option key={el.value} label={el.label} value={el.label} />;
												})
											}
										</Select>
									</Form.Item>
									<Form.Item label="可查站点">
										{/* <Select value={this.state.form.net} placeholder="请选择站点" onChange={this.handleInputChange.bind(this,'net')}>
											<Select.Option label="区域一" value="马湖三站"></Select.Option>
											<Select.Option label="区域二" value="n4935-27-100-80-27-99-105-27-82-119-25-67-82-27-80-113-27-116-70"></Select.Option>
										</Select> */}
										<Select value={this.state.form.net} onChange={this.handleChange.bind(this,'net')}>
											{
												this.state.data.nets.map(el => {
													return <Select.Option key={el.value} label={el.label} value={el.label} />;
												})
											}
										</Select>
									</Form.Item>
									<Form.Item label="所属组">
										{/* <Select value={this.state.form.groups} placeholder="请选择所属组" onChange={this.handleInputChange.bind(this,'groups')}>
											<Select.Option label="前端组" value="g65100109105110671049711011010110885115101114115"></Select.Option>
											<Select.Option label="BI组" value="g65100109105110671049711011010110885115101114115"></Select.Option>
										</Select> */}
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
						</Dialog>
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
	return bindActionCreators({ creator },dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Create);

