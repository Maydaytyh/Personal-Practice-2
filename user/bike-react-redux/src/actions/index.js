export const creator = () => ({
	type: 'CREATE'
});

// export function creator(){
// 	return {
// 		type: 'CREATE'
// 	};
// }
export const qurrier = () => ({
	type: 'RETRIVE'
});

export const updater = () => ({
	type: 'UPDATE'
});

export const duplicator = () => ({
	type: 'COPY'
});
  
export const switcher = () => ({
	type: 'SWITCH'
});

/*
export const toggleTodo = (id) => ({
    type: 'TOGGLE_TODO',
    id
})
*/