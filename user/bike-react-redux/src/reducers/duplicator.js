const duplicator = (state = {},action) => {
	switch (action.type) {
	case 'COPY':
		state.copyResult = action.state;
		return {
			...state,
			copyResult: state.copyResult
		};
		break;
	default:
		return state;
	}
};
export default duplicator;