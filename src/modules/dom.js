import Storage from "./storage";
import Project from "./project";
import Todo from "./todo";


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
        <button class="project-todo" data-id="${project.id}">Add Todo</button>
        <div class="todos-container">${displayTodos(project.todos)}</div>`;
      projectsContainer.appendChild(projectElement);
    });
    const projectDeleteButtons = document.querySelectorAll(".project-delete");
    projectDeleteButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const projectId = e.target.getAttribute("data-id");
        Storage.deleteProject(projectId);
        displayProjects(Storage.getProjects());
      });
    });

    const projectAddTodoButtons = document.querySelectorAll(".project-todo");
    projectAddTodoButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const projectId = e.target.getAttribute("data-id");
        renderTodoForm(projectId);
      });
    });
  };

  const displayTodos = (todos) => {
    return todos.map(
        (todo) => `
            <div class="todo" data-id="${todo.id}">
            <h4>${todo.title}title</h4>
            <p>${todo.description}</p>
            <p>${todo.dueDate}</p>
            <p>${todo.priority}</p>
            <p>${todo.completed ? "is completed" : "not completed"}</p> // maybe add a checkbox
            <button class="todo-edit" data-id="${todo.id}">Edit</button>
            <button class="todo-delete" data-id="${todo.id}">Delete</button>
            </div>`
      )
      .join("")}


  const renderProjectForm = () => {
    const formContainer = document.querySelector("#form-container");
    formContainer.innerHTML = ""; 

    const form = document.createElement("form");
    form.innerHTML = `
      <label for="projectName">Project Name:</label>
      <input type="text" id="projectName" name="projectName" required />
  
      <button type="submit">Add Project</button>
    `;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const newProject = Project(form.projectName.value)
      if (newProject) {
        Storage.addProject(newProject);
        DOM.displayProjects(Storage.getProjects());
        form.innerHTML = "";
      }
    });

    formContainer.appendChild(form);
  };

  const renderTodoForm = (projectId, todoId = null) => {
    const formContainer = document.querySelector("#form-container");
    formContainer.innerHTML = ""; 

    const projects = Storage.getProjects();
    const projectInUse = projects.find((project) => project.id === projectId);
    const todo = projectInUse.todos.find((t) => t.id === todoId) || null; // Find todo if editing
    console.log(projectInUse)
    console.log(todo)
    const form = document.createElement("form");
    form.innerHTML = `
      <label for="title">Title:</label>
      <input type="text" id="title" name="title" value="${
        todo ? todo.title : ""
      }" required />
  
      <label for="description">Description:</label>
      <textarea id="description" name="description">${
        todo ? todo.description : ""
      }</textarea>
  
      <label for="dueDate">Due Date:</label>
      <input type="date" id="dueDate" name="dueDate" value="${
        todo ? todo.dueDate : ""
      }" required />
  
      <label for="priority">Priority:</label>
      <select id="priority" name="priority">
        <option value="low" ${
          todo && todo.priority === "low" ? "selected" : ""
        }>Low</option>
        <option value="medium" ${
          todo && todo.priority === "medium" ? "selected" : ""
        }>Medium</option>
        <option value="high" ${
          todo && todo.priority === "high" ? "selected" : ""
        }>High</option>
      </select>
  
      <button type="submit">${todo ? "Update Todo" : "Add Todo"}</button>
    `;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const newTodo = Todo(
        form.title.value,
        form.description.value,
        form.dueDate.value,
        form.priority.value,
        todo ? todo.completed : false,
        todo ? todo.id : null
      );

/*       if (todo) {
        // Update existing todo
        projectInUse.todos = projectInUse.todos.map((t) =>
          t.id === todo.id ? newTodo : t
        );
      } else {
        // Add new todo */
        projectInUse.addTodo(newTodo);
        console.log(projectInUse.todos)
        console.log(projectInUse, projects, "renderTodoForm was called");
     /*  } */
      const uptoDatedProjects = Storage.updatedProjects(projectInUse, projects);
      Storage.setProjects(uptoDatedProjects);
      DOM.displayProjects(uptoDatedProjects);
      formContainer.innerHTML = "";
    });
    formContainer.appendChild(form);
  };

  return {
    displayProjects,
    renderProjectForm,
    renderTodoForm,
  };
})();
export default DOM;
