import { compose,createStore,applyMiddleware } from 'Redux';
// import { reduxReactRouter, routerStateReducer, ReduxRouter } from 'redux-react-router';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
// import searcher from './reducer/searcher.js';
// import creator from './reducer/creator.js';
import manager from './reducer/manager.js';
const loggerMiddleware = createLogger();

const createStoreWithMiddleware = compose(
	applyMiddleware(thunkMiddleware,loggerMiddleware)
	// reduxReactRouter({ routes, createHistory })
)(createStore);

export default function managerStore() {
	return createStoreWithMiddleware(manager ,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
};

// export const searcherStore = createStore(
// 	searcher,
// 	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

// export const creatorStore = createStore(
// 	creator,
// 	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );
// export const managerStore = createStore(
// 	manager,
// 	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );
// managerStore .subscribe(() =>
// 	console.log(managerStore.getState())
// );