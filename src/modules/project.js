
const Project = (name) => {
    const todos = [];
    const addTodo = (todo) => {
        todos.push(todo);
    }
    const removeTodo = (index) => {
        todos.splice(index, todos.length -1)
    }
    const updateTodo = (newTodo) => {
        const index = todos.findIndex((todo) => todo.id === newTodo.id)
        if (index !== -1) {
            todos[index] = newTodo;
        }
    }
    return {
        name,
        todos,
        id:  Date.now().toString(),
        addTodo,
        removeTodo,
        updateTodo
    }
}
export default Project