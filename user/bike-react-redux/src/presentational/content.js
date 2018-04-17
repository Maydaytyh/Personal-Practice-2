import React, { Component } from 'react';
// import * as actionCreators from '../actions';
// import { bindActionCreators } from 'redux';

import { Table,Button,Switch } from 'element-react';
// import { managerStore } from '../store/index';
import { connect } from 'react-redux';
import Update from '../containers/update';
import Copy from '../containers/copy';
import OnOff from '../containers/switch';
// import './index.css';

import {store} from '../store';
class Content extends Component {
	constructor(props,context) {
		super(props);
		this.state = {
			columns: [
				{
					label: '用户名',
					prop: 'name'
				},
				{
					label: '用户说明',
					prop: 'description'
				},
				{
					label: '用户口令',
					prop: 'password'
				},
				{
					label: '启用状态',
					prop: 'status'
				},
				{
					label: '可查省份',
					prop: 'province'
				},
				{
					label: '可查城市',
					prop: 'city'
				},
				{
					label: '可查站点',
					prop: 'net'
				},
				{
					label: '所属组',
					prop: 'groups'
				},
				{
					label: '操作',
					prop: 'zip',
					fixed: 'right',
					width: 240,
					// render: (row, column, index)=>{
					// 	return <span>
					// 		<Button type="primary" size="small" onClick={this.mapDataToUpdate.bind(this,{row, column, index})}>更新</Button>
					// 		<Button type="primary" size="small">复制</Button>
					// 		<Switch onText="启用" offText="注销"></Switch>
					// 	</span>;
					// }
					render: (row, column, index)=>{
					  return (
							<div>
								{/* <Update user={this.updateRow(index)} provinces={this.getProvince()} groups={this.getGroups()} />							   */}
								<Update store={store} />
								<Copy store={store} />
								<OnOff store={store} />
							</div>
						);
					}
				}
			],
			data: [{
				date: '2016-05-02',
				name: '王小虎',
				province: '上海',
				city: '普陀区',
				address: '上海市普陀区金沙江路 1518 弄',
				zip: 200333
			  },{
				date: '2016-05-02',
				name: '王小虎',
				province: '上海',
				city: '普陀区',
				address: '上海市普陀区金沙江路 1518 弄',
				zip: 200333
			  },{
				date: '2016-05-02',
				name: '王小虎',
				province: '上海',
				city: '普陀区',
				address: '上海市普陀区金沙江路 1518 弄',
				zip: 200333
			  },{
				date: '2016-05-02',
				name: '王小虎',
				province: '上海',
				city: '普陀区',
				address: '上海市普陀区金沙江路 1518 弄',
				zip: 200333
			  },{
				date: '2016-05-02',
				name: '王小虎',
				province: '上海',
				city: '普陀区',
				address: '上海市普陀区金沙江路 1518 弄',
				zip: 200333
			  }],
			provinces:[],
			groups:[]
		};
		this.mapDataToUpdate = this.mapDataToUpdate.bind(this);
		// console.log(managerStore.getState());
	}
	// componentWillReceiveProps(nextProps){
	// 	// const stateObj = managerStore.getState();
	// 	const initialData = stateObj.searchResult.retriveResult;
	// 	const initialProvinceData = stateObj.searchResult.initialData.provincesData;
	// 	const initialGroupsData = stateObj.searchResult.initialData.groupsData;
	// 	// this.setState({
	// 	// 	data:initialProvinceData
	// 	// });	
	// 	this.setState({
	// 		data:initialData
	// 	});
	// 	this.state.provinces = initialProvinceData;
	// 	this.state.groups = initialGroupsData;	
	// }
	mapDataToUpdate(row, column, index){
		const { data,provinces,groups } = this.state;
		store.dispatch({state:this.state, type: 'SWITCH'});
		// console.log(row,column,index);
	}
	// updateRow(index){
	// 	const { data } = this.state;
	// 	// return data[index];
	// }
	// getProvince(){
	// 	const { provinces } = this.state;
	// 	// return provinces;
	// }
	// getGroups(){
	// 	const { groups } = this.state;
	// 	// return groups;
	// }
	render () {
		return (
			<div className="Content">		
				<Table
					style={{width: '100%'}}
					columns={this.state.columns}
					data={this.state.data}
				>
				</Table>
				{/* <Update /> */}
				<Update />
				{/* <Copy /> */}
				<Copy />
				{/* <Switch /> */}
			</div>
		);
	}
}
// function mapStateToProps(state){
// 	return state;
// 	// return { todos: state.todos }
// }
// function mapDispatchToProps(dispatch){
// 	return bindActionCreators(actionCreators,dispatch);
// }
// // export default connect(mapStateToProps, mapDispatchToProps)(Content);
// export default connect(mapStateToProps, mapDispatchToProps)(Content,Update,Copy,Switch);
export default Content;
