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
        <button class="project-todo">Add Todo</button>
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
    const projectDeleteButtons = document.querySelectorAll(".project-delete");
    projectDeleteButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const projectId = e.target.getAttribute("data-id");
        Storage.deleteProject(projectId);
        displayProjects(Storage.getProjects());
      });
    });

    const projectAddTodoButtons = document.querySelectorAll(".project-todo");
    
  };

  //const displayTodos = (todos) => {}

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
      const projectName = form.projectName.value
      if (projectName) {
        Storage.addProject(projectName);
        DOM.displayProjects(Storage.getProjects());
        form.innerHTML = "";
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
        todo ? todo.completed : false
      );
      const projects = Storage.getProjects();
      if (todo) {
        // Update existing todo
        projects[projectIndex].updateTodo(todo, newTodo);
      } else {
        // Add new todo
        projects[projectIndex].addTodo(newTodo);
      }
      Storage.setProjects(projects);
      DOM.displayProjects(projects);
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
