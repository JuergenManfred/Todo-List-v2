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
        <div class="todos-container">${project.todos.map((todo) => `
                <div class="todo">
                <h4>${todo.title}</h4>
                <p>${todo.description}</p>
                <p>${todo.dueDate}</p>
                <button class="todo-delete" data-id="${todo.id}">Delete</button>
                </div>`).join('')}</div>`
      ;
      projectsContainer.appendChild(projectElement);
  });
}
return displayProjects;
  });
  export default DOM;