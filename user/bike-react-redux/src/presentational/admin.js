import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import * as actions from '../actions';
// import { bindActionCreators } from 'redux';

import Retrive from '../containers/retrive';
import Create from '../containers/create';
import Update from '../containers/update';
import Copy from '../containers/copy';
import Switch from '../containers/switch';
import Content from './content';
// import managerStore from '../../store/index';

// const Store = managerStore();

class Admin extends Component {
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div className="Admin">
				<Retrive></Retrive>
				<Create></Create>
				{/* <Update></Update>
				<Copy></Copy>
				<Switch></Switch> */}
				<Content></Content>
			</div>
		);
	}
}

// function mapStateToProps(state){
// 	return state;
// 	// return { todos: state.todos }
// }
// function mapDispatchToProps(dispatch){
// 	return bindActionCreators(actions,dispatch);
// }
// export default connect(mapStateToProps, mapDispatchToProps)(Admin);
export default Admin ;