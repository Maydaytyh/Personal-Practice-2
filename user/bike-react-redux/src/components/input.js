import React , { Component } from 'react';
import { Input } from 'element-react';

class UmInput extends Component {
	constructor(props){
		super(props);
		this.name = this.props.name;
		this.placeholder = '请输入'+this.name || '请输入内容';		
		this.value = this.props.value;
		this.state = {value:this.value};
		this.handleInputChange = this.handleInputChange.bind(this);
	}
	handleInputChange(event){
		// console.log(event);
		const value = event;
		this.setState({
			value:value
		});
		/**
		 * desc: 组件通信延时的坑
		 * code: this.props.pipe(this.name,this.state.value);
		 * reason: this.setState()是异步非阻塞的，不带数据直接返回，所以this.props.pipe()获取的this.state.value的值是历史值。
		 */
		this.props.pipe(this.name,value);
	}
	render () {
		return <Input 
			placeholder={this.placeholder} 
			name={this.name} 
			value={this.state.value} 
			onChange={this.handleInputChange}
		></Input>;
	}
}

export default UmInput;