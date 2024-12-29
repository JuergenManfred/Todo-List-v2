import DOM from './modules/dom';
import Project from './modules/project';
import Storage from './modules/storage';
import Todo from './modules/todo';


let projects = Storage.getProjects();

if (!projects) {
    let defaultProject = Project('Default');
    projects.push(defaultProject);
    Storage.setProjects(projects);
}
    console.log(projects)
    
    DOM.displayProjects(projects);

    document.querySelector('.add-project').addEventListener('click', () => {
        let projectName = prompt('Enter project name');
        let project = Project(projectName);
        projects.push(project);
        Storage.setProjects(projects);
        DOM.displayProjects(projects);
    });