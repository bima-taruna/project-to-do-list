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
    this.container.appendChild(this.title);
    this.container.appendChild(task);
  }

  get taskFilter() {
    return this.container;
  }
}

export const taskFilter = new TaskFilters();
