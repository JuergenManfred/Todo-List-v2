import Storage from "./storage";
import DOM from "./dom";

document.querySelector(".todo-search").addEventListener("input", (e) => {
    e.preventDefault();
  const query = e.target.value.toLowerCase();
  console.log(query, "todo-search was called");
  filterAndDisplayTodos(
    query,
    document.querySelector(".todo-filter-status").value,
    document.querySelector(".todo-filter-priority").value
  );
});

document
  .querySelector(".todo-filter-status")
  .addEventListener("change", (e) => {
    const filterValue = e.target.value;
    filterAndDisplayTodos(
      document.querySelector(".todo-search").value.toLowerCase(),
      filterValue, document.querySelector(".todo-filter-priority").value
    );
  });

document
  .querySelector(".todo-filter-priority")
  .addEventListener("change", (e) => {
    const filterValue = e.target.value;
    filterAndDisplayTodos(
      document.querySelector(".todo-search").value.toLowerCase(),
      document.querySelector(".todo-filter-status").value,
      filterValue
    );
  });

const filterAndDisplayTodos = (
  searchQuery,
  filterValueStatus,
  filterValuePriority
) => {
  let projects = Storage.getProjects();
  console.log(projects, "filterAndDisplayTodos was called");

  projects = projects.map((project) => {
    const filteredTodos = project.todos.filter((todo) => {
      const matchesSearch =
        todo.title.toLowerCase().includes(searchQuery) ||
        todo.description.toLowerCase().includes(searchQuery);

      let matchesFilter = true;
      if (filterValueStatus === "completed") {
        matchesFilter = todo.completed;
      } else if (filterValueStatus === "incomplete") {
        matchesFilter = !todo.completed;
      } else if (["low", "medium", "high"].includes(filterValuePriority)) {
        matchesFilter = todo.priority === filterValuePriority;
      }

      return matchesSearch && matchesFilter;
    });
    return { ...project, todos: filteredTodos };
  });
  DOM.displayProjects(projects);
};
