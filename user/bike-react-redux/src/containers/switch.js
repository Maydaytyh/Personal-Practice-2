import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { switcher } from '../actions';
import { bindActionCreators } from 'redux';

import {Switch} from 'element-react';
import Config from '../api/config';
import API from '../api/index';
// import { managerStore } from '../store/index';
import '../styles/index.css';


class OnOff extends Component {
	constructor (props) {
		super(props);
		this.state = {
			status:true
		};
		this.switchControl = this.switchControl.bind(this);
	}
	switchControl (status) {
		if(status === true){
			this.setState({
				status:false
			});
			managerStore.dispatch({state:this.state, type: 'SWITCH'});
		}else if(status === false){
			this.setState({
				status:true
			});
			managerStore.dispatch({state:this.state, type: 'SWITCH'});
		}else{
			throw error('请检查默认状态值是否为\'on\'或者\'off\'');
		}
	}
	render() {
		return (
			<div className="Switch display-in-one-line">
				<Switch
					value={this.state.status}
					onText="启用"
					offText="注销"
					onChange={this.switchControl.bind(this,this.state.status)}
				>
				</Switch>
			</div>
		);
	}
}

function mapStateToProps(state){
	return state;
	// return { todos: state.todos }
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({ switcher },dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(OnOff);