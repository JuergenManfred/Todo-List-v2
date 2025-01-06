
const Todo = (title, description, dueDate, priority, completed = false, id = null) => {
    const todoId = id ? id : Date.now().toString()
    const toggleComplete = () => {
            completed = !completed
        }
    
    return {
        title,
        description,
        dueDate,
        priority,
        completed,
        toggleComplete,
        id: todoId
        }
    }



export default Todo