import React,{Component} from 'react';
import { Form } from 'element-react';
import UmButton from '../button';
import UmInput from '../input';

class UmForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			form: {
				name: '',
				password: null,
				province: '',
				city: '',
				area: [],
				group: []
			}
		};
		this.composeFormReq = this.composeFormReq.bind(this);
	}
	composeFormReq (key,value) {
		this.state.form[key] = value;
		this.forceUpdate();
	}
	render(){
		return (
			<div className="UmForm">
				<Form model={this.state.form} labelWidth="20">
					<Form-item label="姓名">
						<UmInput name="name" value={this.state.form.name} pipe={this.composeFormReq}></UmInput>
					</Form-item>
					<Form-item label="密码">
						<UmInput name="password" value={this.state.form.password} pipe={this.composeFormReq}></UmInput>
					</Form-item>
					<Form-item label="省份">
						<UmInput name="province" value={this.state.form.province} pipe={this.composeFormReq}></UmInput>
					</Form-item>
					<Form-item label="城市">
						<UmInput name="city" value={this.state.form.city} pipe={this.composeFormReq}></UmInput>
					</Form-item>
					<Form-item label="区域">
						<UmInput name="area" value={this.state.form.area} pipe={this.composeFormReq}></UmInput>
					</Form-item>
					<Form-item label="用户组">
						<UmInput name="group" value={this.state.form.group} pipe={this.composeFormReq}></UmInput>
					</Form-item>
					<Form-item>
						<UmButton name="确定" type="primary"></UmButton>
						<UmButton name="取消"></UmButton>
					</Form-item>
				</Form>
			</div>
		);
	}
}

export default UmForm;