const qurrier = (state = {},action) => {
	switch (action.type) {
	case 'RETRIVE':
		state.searchResult = action.state;
		return {
			...state,
			searchResult:state.searchResult
		};
		break;
	default:
		return state;
	}
};
export default qurrier;