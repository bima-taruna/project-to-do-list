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
    this.title = document.createElement("div");
    this.title.classList.add("task-container-title");
    this.title.textContent = title;
    if (this.title.textContent === "All Tasks") {
      this.btnAddTask = document.createElement("button");
      this.btnAddTask.classList.add("material-icons");
      this.btnAddTask.classList.add("btn-add-task");
      this.btnAddTask.textContent = "add";
      this.title.appendChild(this.btnAddTask);
      this.btnAddTask.addEventListener("click", () => {
        indexDOM.taskModal.changeButtonText("Add");
        indexDOM.taskModal.removeProjectTag();
        indexDOM.taskModal.removeEditTag();
        indexDOM.taskModal.resetForm();
        indexDOM.taskModal.openModal();
      });
    }
    this.container.appendChild(this.title);
    this.container.appendChild(task);
  }

  get taskFilter() {
    return this.container;
  }
}

export const taskFilter = new TaskFilters();
