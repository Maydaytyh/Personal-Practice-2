const searcher = (state = [],action) => {
	switch (action.type) {
	case 'SEARCH':
		return action.state;
	default:
		return state;
	}
};
export default searcher;