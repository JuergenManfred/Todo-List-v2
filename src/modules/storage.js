import Project from "./project";

const Storage = (() => {

  const rehydrateProjects = (rawProject) => {
  const project = Project(rawProject.name)
  project.id = rawProject.id
  project.todos = rawProject.todos.map((rawTodo) => 
    rehydrateTodos(rawTodo)
  )
  return project
  }
const rehydrateTodos = (rawTodo) => {
  return Todo(
    rawTodo.title,
    rawTodo.description,
    rawTodo.dueDate,
    rawTodo.priority,
    rawTodo.completed,
    rawTodo.id
  )
}


  const setProjects = (projects) => {
    localStorage.setItem("projects", JSON.stringify(projects));
  };
  const getProjects = () => {
    const rawProjects = JSON.parse(localStorage.getItem("projects")) || [];
    return rawProjects.map((rawProject) => rehydrateProjects(rawProject));
  };

  const addProject = (project) => {
    const projects = getProjects();
    const projectExists = projects.some(
      (projectId) => project.id === projectId
    );
    if (projectExists) {
      alert("Project already exists");
      return;
    }
   setProjects([...projects, project]);
  };

  const addTodoToProject = (projectId, todo) => {
    const projects = getProjects();
    const projectIndex = projects.findIndex(
      (project) => project.id === projectId
    );
    if (projectIndex === -1) {
      alert("Project not found");
      return;
    }
    projects[projectIndex].addTodo(todo);
    setProjects(projects);
  };

  const deleteProject = (projectId) => {
    const projects = getProjects();
    const newProjects = projects.filter((project) => project.id !== projectId);
    setProjects(newProjects);
  };

  return {
    getProjects,
    addProject,
    addTodoToProject,
    deleteProject,
    setProjects,
  };
})();
export default Storage;
