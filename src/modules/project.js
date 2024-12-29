
const Project = (name) => {
    const todos = [];
    const addTodo = (todo) => {
        this.todos.push(todo);
    }
    const removeTodo = (index) => {
        todos.splice(index, todos.length -1)
    }
    const updateTodo = (index, newTodo) => {
        todos[index] = newTodo;
    }
    return {
        name,
        todos,
        addTodo,
        removeTodo,
        updateTodo
    }
}
export default Project