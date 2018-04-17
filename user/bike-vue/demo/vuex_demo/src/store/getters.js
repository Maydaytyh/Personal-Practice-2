export const doneTodos = state => {
    return state.todos.filter(todo => todo.done)
}