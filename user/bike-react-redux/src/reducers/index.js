import { combineReducers } from 'redux';
import creator from './creator';
import qurrier from './qurrier';
import updater from './updater';
import duplicator from './duplicator';
import switcher from './switcher';

const userManagementApp = combineReducers({
	creator,
	qurrier,
	updater,
	duplicator,
	switcher
});

export default userManagementApp;