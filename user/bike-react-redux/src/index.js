import React from 'react';
import ReactDOM from 'react-dom';
// import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './presentational/App';
// import reducer from './reducers';
// import {
// 	BrowserRouter as Router,
// 	Route,
// 	Link
// } from 'react-router-dom';

import './index.css';
import 'element-theme-default';
import registerServiceWorker from './registerServiceWorker';

// const store = createStore(reducer);

// render(
// 	<App />,
// 	document.getElementById('root')
// );
// registerServiceWorker();




import {store} from './store';

const render = () =>{
	ReactDOM.render(
		<Provider store={store}>
			<App />
		</Provider>,
		document.getElementById('root')
	);
};
store.subscribe(render);
render();

registerServiceWorker();

