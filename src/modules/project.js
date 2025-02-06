const Project = (name, todos = [], showAll = false, showTodosLimit = 2) => {
  const addTodo = (todo) => {
    todos.push(todo);
    console.log(todos, "addTodo was called", name);
  };
  const removeTodo = (todoId) => {
    todos.splice(
      todos.findIndex((todo) => todo.id === todoId),
      1
    );
  };
  const updateTodo = (newTodo) => {
    const index = todos.findIndex((todo) => todo.id === newTodo.id);
    if (index !== -1) {
      todos[index] = newTodo;
    }
  };
  const toggleShowAll = () => {
    return (showAll = !showAll);
  };
  const getShowAll = () => showAll;
  const getShowTodosLimit = () => showTodosLimit;
  return {
    name,
    todos,
    id: Date.now().toString(),
    toggleShowAll,
    getShowAll,
    getShowTodosLimit,
    addTodo,
    removeTodo,
    updateTodo,
  };
};
export default Project;
