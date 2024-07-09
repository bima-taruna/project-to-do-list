import "./style/allTask.css";
import TaskCard from "./component/taskCard";

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
      tasks.forEach((item) => {
        let newtaskCard = new TaskCard(
          item.title,
          item.desc,
          item.date,
          item.priority
        );
        this.taskContainer.appendChild(newtaskCard);
      });
    } else {
      this.taskContainer.textContent = "empty..";
    }
  }
}

export const taskDOM = new TaskDOM();
