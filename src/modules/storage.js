const Storage = () => {

  const setProjects = (projects) => {
    localStorage.setItem("projects", JSON.stringify(projects));
  };
  const getProjects = () => {
    return JSON.parse(localStorage.getItem("projects")) || [];
  };
  return {
    setProjects,
    getProjects,
  };
};
