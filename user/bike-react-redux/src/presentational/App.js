import React, { Component } from 'react';
// import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Routes from '../router/index.js';
// import logo from './logo.svg';
// //import './App.css';
// import UmButton from './components/button';
// import UmInput from './components/input';
// import Common from './page/common/common';
// import Admin from './page/admin/index';
import '../styles/bootstrap.min.css';

import Create from '../containers/create';
import Retrive from '../containers/retrive';
import Update from '../containers/update';
import Copy from '../containers/copy';
import Switch from '../containers/switch';
// const Store = managerStore();
// import { Provider } from 'react-redux';

// import { createStore } from 'redux';
// import from './reducers'
// import reducer from '../reducers';
// const store = createStore(reducer);

import {store} from '../store';
// store.subscribe(() =>
// 	console.log(store.getState())
// );
class App extends Component {
	render() {
		return (
			<div className="App">
				{/* <Provider store={store}>
					<Routes></Routes>
				</Provider> */}
				<Routes></Routes>
			</div>
		);
	}
}

// store.subscribe(render);
export default App;
