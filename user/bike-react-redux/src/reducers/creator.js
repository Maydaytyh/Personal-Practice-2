const creator = (state = {},action) => {
	switch (action.type) {
	case 'CREATE':
		state.createResult = action.state;
		return {
			...state,
			createResult:state.createResult
		}; 
		break;
	default:
		return state;
	}
};
export default creator;