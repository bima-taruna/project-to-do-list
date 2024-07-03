import indexDOM from ".";
import "./style/taskContainer.css";

class TaskFilters {
  constructor() {
    this.container = document.createElement("div");
    this.container.classList.add("task-filter-container");
  }

  render(title, task) {
    while (this.container.children.length > 0) {
      this.container.childNodes.forEach((item) => {
        this.container.removeChild(item);
      });
    }
    this.btnAddTask = document.createElement("button");
    this.btnAddTask.classList.add("material-icons");
    this.btnAddTask.classList.add("btn-add-task");
    this.btnAddTask.textContent = "add";
    this.title = document.createElement("div");
    this.title.classList.add("task-container-title");
    this.title.textContent = title;
    this.container.appendChild(this.title);
    this.title.appendChild(this.btnAddTask);
    this.container.appendChild(task);
    this.btnAddTask.addEventListener("click", () => {
      indexDOM.taskModal.changeButtonText("Add");
      indexDOM.taskModal.openModal();
    });
  }

  get taskFilter() {
    return this.container;
  }
}

export const taskFilter = new TaskFilters();
