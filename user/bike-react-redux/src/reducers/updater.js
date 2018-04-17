const updater = (state = {},action) => {
	switch (action.type) {
	case 'UPDATE':
		state.updateResult = action.state;
		return {
			...state,
			updateResult: state.updateResult
		};
		break;
	default:
		return state;
	}
};
export default updater;