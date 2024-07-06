import "./style/allTask.css";

class TaskDOM {
  constructor() {
    this.taskContainer = document.createElement("div");
    this.taskContainer.classList.add("task-container");
  }

  render(tasks) {
    this.fetchTask(tasks);
  }

  fetchTask(tasks) {
    if (tasks && tasks.length > 0) {
      while (this.taskContainer.children.length > 0) {
        this.taskContainer.childNodes.forEach((item) => {
          this.taskContainer.removeChild(item);
        });
      }
      const taskName = tasks.map((task) => task.title);
      taskName.forEach((item) => {
        let newtaskCard = document.createElement("div");
        newtaskCard.textContent = item;
        this.taskContainer.appendChild(newtaskCard);
      });
    } else {
      this.taskContainer.textContent = "empty..";
    }
  }
}

export const taskDOM = new TaskDOM();
