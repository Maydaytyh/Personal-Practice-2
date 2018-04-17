const manager = (state = {},action) => {
	switch (action.type) {
	case 'CREATE':
		state.createResult = action.state;
		return {
			...state,
			createResult:state.createResult
		};
		break;
	case 'RETRIVE':
		state.searchResult = action.state;
		return {
			...state,
			searchResult:state.searchResult
		};
		break;
	case 'UPDATE':
		state.updateResult = action.state;
		return {
			...state,
			updateResult: state.updateResult
		};
		break;
	case 'COPY':
		state.copyResult = action.state;
		return {
			...state,
			copyResult: state.copyResult
		};
		break;
	case 'SWITCH':
		state.switchStatus = action.state;
		return {
			...state,
			copyStatus: state.copyStatus
		};
		break;
	// case 'GET_PROVINCE':
	// 	// state.initialData = {province:[]};
	// 	state.initialProvince = action.state.provinceData;
	// 	return {
	// 		...state,
	// 		initialProvince:action.state.provinceData
	// 	};
	// 	break;
	default:
		return state;
	}
};
export default manager;