

function toDo(title, description, dueDate, priority) {
    return {
        title,
        description,
        dueDate,
        priority,
        completed: false,
        toggleComplete() {
            this.completed = !this.completed
        }
    }

}

export default toDo