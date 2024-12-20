

const Todo = (title, description, dueDate, priority) => {
    const completed = false
    const toggleComplete = () => {
            completed = !completed
    
    return {
        title,
        description,
        dueDate,
        priority,
        completed,
        toggleComplete,
        }
    }

}

export default Todo