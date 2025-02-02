import Storage from "./storage";
import Project from "./project";
import Todo from "./todo";


const DOM = (() => {
  const findProjectById = (projects, projectId) => {
    return projects.find((project) => project.id === projectId);
  };

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
        <div class="todos-container" data-id="${project.id}">${displayTodos(project.todos, project.getShowAll(), project.getShowTodosLimit())}</div>`;
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

    const todoEditButtons = document.querySelectorAll(".todo-edit");
    todoEditButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const todoId = e.target.getAttribute("data-id");
        const projectId = e.target.closest(".project").querySelector(".project-todo").getAttribute("data-id");
        renderTodoForm(projectId, todoId);
      });
    });

    const todoDeleteButtons = document.querySelectorAll(".todo-delete");
    todoDeleteButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const todoId = e.target.getAttribute("data-id");
        const projectId = e.target.closest(".project").querySelector(".project-todo").getAttribute("data-id");
        const projects = Storage.getProjects();
        const project = findProjectById(projects, projectId);
        project.removeTodo(todoId);
        Storage.setProjects(projects);
        displayProjects(projects);
      });
    });
    const todoCompleteCheckboxes = document.querySelectorAll(".todo-complete");
    todoCompleteCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", (e) => {
        const todoId = e.target.getAttribute("data-id");
        const projectId = e.target.closest(".project").querySelector(".project-todo").getAttribute("data-id");
        const projects = Storage.getProjects();
        const project = findProjectById(projects, projectId);
        const todo = project.todos.find((todo) => todo.id === todoId);
        todo.completed = todo.toggleComplete();
        console.log(project.getShowAll())
        Storage.setProjects(projects);
        displayProjects(projects);
      });
    });

    const showMoreButtons = document.querySelectorAll(".show-more");
    showMoreButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const projectId = e.target.closest(".project").querySelector(".project-todo").getAttribute("data-id");
        const projects = Storage.getProjects();
        const project = findProjectById(projects, projectId);
        project.showAll = project.toggleShowAll();
        Storage.setProjects(projects);
        displayProjects(projects);
      });
    });

    const showLessButtons = document.querySelectorAll(".show-less");
    showLessButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const projectId = e.target.closest(".project").querySelector(".project-todo").getAttribute("data-id");
        const projects = Storage.getProjects();
        const project = findProjectById(projects, projectId);
        project.showAll = project.toggleShowAll();
        Storage.setProjects(projects);
        displayProjects(projects);
      });
    });

  };

  const displayTodos = (todos, showAll, showTodosLimit) => {
    const todosLength = todos.length;
    if(!showAll) {
      todos = todos.slice(0, showTodosLimit);
    }
    return todos.map(
        (todo) => `
            <div class="todo ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
            <h4>${todo.title}title</h4>
            <p>${todo.description}</p>
            <p>${todo.dueDate}</p>
            <p class="priority-badge priority-${todo.priority}">${todo.priority}</p>
            <p>${todo.completed ? "is completed" : "not completed"}</p>
            <input type="checkbox" class="todo-complete" data-id="${todo.id}" ${todo.completed ? "checked" : ""}>
            <div class="todo-buttons">
            <button class="todo-edit" data-id="${todo.id}">Edit</button>
            <button class="todo-delete" data-id="${todo.id}">Delete</button>
            </div>
            </div>`
      )
      .join("") +
      (todosLength > showTodosLimit && !showAll
        ? `<button class="show-more">Show More</button>`
        : showAll
        ? `<button class="show-less">Show Less</button>`
        : "");}


  const renderProjectForm = () => {
    const formContainer = document.querySelector("#form-container");
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
        form.remove();
      }
    });

    formContainer.appendChild(form);
  };

  const renderTodoForm = (projectId, todoId = null) => {
    
    const projects = Storage.getProjects();
    const projectInUse = findProjectById(projects, projectId);
    const todo = projectInUse.todos.find((t) => t.id === todoId) || null; // Find todo if editing
    const formContainer = todo
    ? document.querySelector(`.todo[data-id="${todoId}"]`)
    : document.querySelector(`.project .todos-container[data-id="${projectId}"]`);

    formContainer.innerHTML = ""; 
  
    if (!formContainer) {
      console.error("Form container not found");
      console.log(projectInUse)
      console.log(todo)
      return;
    }
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

      if (todo) {
        // Update existing todo
        projectInUse.todos = projectInUse.todos.map((t) =>
          t.id === todo.id ? newTodo : t
        );
      } else {
        
        projectInUse.addTodo(newTodo);
     }
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
