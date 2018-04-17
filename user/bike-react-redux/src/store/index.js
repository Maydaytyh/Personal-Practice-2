import { createStore } from 'Redux';
// import searcher from './reducer/searcher.js';
// import creator from './reducer/creator.js';
import reducer from '../reducers';

// export const searcherStore = createStore(
// 	searcher,
// 	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

// export const creatorStore = createStore(
// 	creator,
// 	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );
export const store = createStore(
	reducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);