const switcher = (state = {},action) => {
	switch (action.type) {
	case 'SWITCH':
		state.switchStatus = action.state;
		return {
			...state,
			copyStatus: state.copyStatus
		};
		break;
	default:
		return state;
	}
};
export default switcher;