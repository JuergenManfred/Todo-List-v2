const Storage = (() => {
  const setProjects = (projects) => {
    localStorage.setItem("projects", JSON.stringify(projects));
  };
  const getProjects = () => {
    return JSON.parse(localStorage.getItem("projects")) || [];
  };

  const addProject = (projectName) => {
    const projects = getProjects();
    const projectExists = projects.some((project) => project.name === projectName)
    if (projectExists) {
      alert("Project already exists");
      return}
    const newProject = { name: projectName, todos: [] };
    setProjects([...projects, newProject]);
  };

  const addTodoToProject = (projectName, todo) => {
    const projects = getProjects();
    const projectIndex = projects.findIndex((project) => project.name === projectName);
    if (projectIndex === -1) {
      alert("Project not found");
      return;
    }
    projects[projectIndex].todos.push(todo);
    setProjects(projects); 
  }
  return {
    setProjects,
    getProjects,
    addProject,
    addTodoToProject
  };
})();
export default Storage;
