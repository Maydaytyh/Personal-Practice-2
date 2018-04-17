import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { duplicator } from '../actions';
import { bindActionCreators } from 'redux';


// import { connect } from 'react-redux';
import {Button,Input,Select,Dialog,Form} from 'element-react';
// import UmButton from '../../components/button.js';
// import UmForm from '../../components/form/form.js';
import Config from '../api/config';
import API from '../api/index';
// import { managerStore } from '../store/index';
import '../styles/index.css';



class Copy extends Component {
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
			  area:'',
			  group:[]
			},
			validate:{
				password:''
			},
			data:[]
		  };
		this.emitUserForm = this.emitUserForm.bind(this);
		this.getRemoteData = this.getRemoteData.bind(this);
		this.setDialogVisible = this.setDialogVisible.bind(this);
	}
	setDialogVisible(status){
		this.setState({
			dialogVisible:status
		});
	}
	getRemoteData (data) {
		this.state.data = data; 
	}
	emitUserForm () {
		this.setDialogVisible(false);
		const url = Config.devApi;

		API.getData(url,this.getRemoteData);
	
		managerStore.dispatch({state:this.state, type: 'COPY'});
		// console.log('弹出用户信息表单');
		// console.log(creatorStore);

	}
	render(){
		return (
			<div className="Copy display-in-one-line">
				<div className="container">
					<div className="row">
						<Button onClick={this.setDialogVisible.bind(this,true)} type="primary">复制</Button>
						<Dialog
							title="用户信息"
							visible={ this.state.dialogVisible }
							onCancel={this.setDialogVisible.bind(this,false)}
						>
							<Dialog-Body className="dialog-footer">
								<Form model={this.state.form} labelWidth="100">
									<Form.Item label="用户名" >
										<Input value={this.state.form.name}></Input>
									</Form.Item>
									<Form.Item label="用户说明" >
										<Input value={this.state.form.description}></Input>
									</Form.Item>
									<Form.Item label="用户口令" >
										<Input value={this.state.form.password}></Input>
									</Form.Item>
									<Form.Item label="确认口令" >
										<Input value={this.state.validate.password}></Input>
									</Form.Item>
									<Form.Item label="启用状态">
										<Select value={this.state.form.status} placeholder="请选择状态">
											<Select.Option label="开启" value='true'></Select.Option>
											<Select.Option label="关闭" value='false'></Select.Option>
										</Select>
									</Form.Item>
									<Form.Item label="可查省份">
										<Select value={this.state.form.province} placeholder="请选择省份">
											<Select.Option label="浙江" value="zhejiang"></Select.Option>
											<Select.Option label="江苏" value="jiangsu"></Select.Option>
										</Select>
									</Form.Item>
									<Form.Item label="可查城市">
										<Select value={this.state.form.city} placeholder="请选择城市">
											<Select.Option label="杭州" value="hangzhou"></Select.Option>
											<Select.Option label="宁波" value="ningbo"></Select.Option>
										</Select>
									</Form.Item>
									<Form.Item label="可查站点">
										<Select value={this.state.form.area} placeholder="请选择站点">
											<Select.Option label="区域一" value="area0"></Select.Option>
											<Select.Option label="区域二" value="area1"></Select.Option>
										</Select>
									</Form.Item>
									<Form.Item label="所属组">
										<Select value={this.state.form.group} placeholder="请选择所属组">
											<Select.Option label="前端组" value="shanghai"></Select.Option>
											<Select.Option label="BI组" value="beijing"></Select.Option>
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
	return bindActionCreators({ duplicator },dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Copy);