import React ,{ Component } from 'react';
import { Button } from 'element-react';

class UmButton extends Component {
	constructor(props){
		super(props);
		this.name = this.props.name;
		this.type = this.props.type || '';
		this.meathod = this.props.pipe;
	}
	render() {
		return (
			<Button type={this.type} onClick={this.method}>{this.name}</Button>
		);
	}
}

export default UmButton;