
const Project = (name) => {
    const todos = [];
    const addTodo = (todo) => {
        this.todos.push(todo);
    }
    const removeTodo = (index) => {
        todos.splice(index, todos.length -1)
    }
    return {
        name,
        todos,
        addTodo,
        removeTodo
    }
}
export default Project