import Project from "./project";

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
    const newProject = Project(projectName);
    setProjects([...projects, newProject]);
  };

  const addTodoToProject = (projectId, todo) => {
    const projects = getProjects();
    const projectIndex = projects.findIndex((project) => project.id === projectId);
    if (projectIndex === -1) {
      alert("Project not found");
      return;
    }
    projects[projectIndex].todos.push(todo);
    setProjects(projects); 
  }

    const deleteProject = (projectId) => {
    const projects = getProjects();
    const newProjects = projects.filter((project) => project.id !== projectId);
    setProjects(newProjects);
  }

  return {
    getProjects,
    addProject,
    addTodoToProject,
    deleteProject
  };
})();
export default Storage;
