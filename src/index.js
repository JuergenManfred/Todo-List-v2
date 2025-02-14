import DOM from "./modules/dom";
import Project from "./modules/project";
import Storage from "./modules/storage";
import Todo from "./modules/todo";
import Filter from "./modules/filter";
import PictureCarousel from "./modules/pictureCarousel";
import "./styles/style.css";

let projects = Storage.getProjects();
DOM.displayProjects(projects);
const createProjectButton = document.querySelector(".add-project");
createProjectButton.addEventListener("click", () => {
  DOM.renderProjectForm();
});



