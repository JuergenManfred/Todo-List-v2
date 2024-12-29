const DOM = (() => {
  const displayProjects = (projects) => {
    const projectsContainer = document.querySelector(".projects-container");
    projectsContainer.innerHTML = "";
    projects.forEach((project) => {
      const projectElement = document.createElement("div");
      projectElement.classList.add("project");
      projectElement.innerHTML = `
        <h3>${project.name}</h3>
        <button class="project-delete" data-id="${project.id}">Delete</button>
        <div class="todos-container">${project.todos
          .map(
            (todo) => `
                <div class="todo">
                <h4>${todo.title}</h4>
                <p>${todo.description}</p>
                <p>${todo.dueDate}</p>
                <button class="todo-delete" data-id="${todo.id}">Delete</button>
                </div>`
          )
          .join("")}</div>`;
      projectsContainer.appendChild(projectElement);
    });
  };

  const renderProjectForm = () => {
    const formContainer = document.querySelector("#form-container");
    formContainer.innerHTML = ""; // Clear any existing form
  
    const form = document.createElement("form");
    form.innerHTML = `
      <label for="projectName">Project Name:</label>
      <input type="text" id="projectName" name="projectName" required />
  
      <button type="submit">Add Project</button>
    `;
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const projectName = form.projectName.value;
      if (projectName) {
         let projects = Storage.getProjects();
        Storage.setProjects([...projects, { name: projectName, todos: [] }]);
        DOM.displayProjects(Storage.getProjects());
        
      }
    });
  
    formContainer.appendChild(form);
  };


  const renderTodoForm = (projectIndex, todo = null) => {
    const formContainer = document.querySelector("#form-container");
    formContainer.innerHTML = ""; // Clear any existing form

    const form = document.createElement("form");
    form.innerHTML = `
      <label for="title">Title:</label>
      <input type="text" id="title" name="title" value="${todo ? todo.title : ""}" required />

      <label for="description">Description:</label>
      <textarea id="description" name="description">${todo ? todo.description : ""}</textarea>

      <label for="dueDate">Due Date:</label>
      <input type="date" id="dueDate" name="dueDate" value="${todo ? todo.dueDate : ""}" required />

      <label for="priority">Priority:</label>
      <select id="priority" name="priority">
        <option value="low" ${todo && todo.priority === "low" ? "selected" : ""}>Low</option>
        <option value="medium" ${todo && todo.priority === "medium" ? "selected" : ""}>Medium</option>
        <option value="high" ${todo && todo.priority === "high" ? "selected" : ""}>High</option>
      </select>

      <button type="submit">${todo ? "Update Todo" : "Add Todo"}</button>
    `;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const newTodo = {
        title: form.title.value,
        description: form.description.value,
        dueDate: form.dueDate.value,
        priority: form.priority.value,
        completed: todo ? todo.completed : false,
      };
      if (todo) {
        // Update existing todo
        projects[projectIndex].updateTodo(todo, newTodo);
      } else {
        // Add new todo
        projects[projectIndex].addTodo(newTodo);
      }
      renderTodos(projects[projectIndex].todos);
    });

    formContainer.appendChild(form);
  };


  return {
    displayProjects, renderProjectForm ,renderTodoForm };
})();
export default DOM;
