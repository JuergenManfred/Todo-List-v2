
const Todo = (title, description, dueDate, priority, completed = false, id = null) => {
    const todoId = id ? id : Date.now().toString()
    const toggleComplete = () => {
            return completed = !completed
        }
    
    return {
        title,
        description,
        dueDate,
        priority,
        completed,
        id: todoId,
        toggleComplete
        }
    }



export default Todo