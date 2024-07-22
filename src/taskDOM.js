import indexDOM from ".";
import TaskCard from "./component/taskCard";
import { searchDOM } from "./helper/searchDOM";
import { storage } from "./storage";
import { user } from "./user";

class TaskDOM {
  taskIndex;
  constructor() {
    this.taskContainer = document.createElement("div");
    this.taskContainer.classList.add("task-container");
  }

  render(tasks, isProject = false) {
    this.isProject = isProject;
    this.fetchTask(tasks);
  }

  fetchTask(tasks) {
    while (this.taskContainer.children.length > 0) {
      this.taskContainer.childNodes.forEach((item) => {
        this.taskContainer.removeChild(item);
      });
    }
    if (tasks && tasks.length > 0) {
      tasks.forEach((item, index) => {
        let newtaskCard = new TaskCard(
          index,
          item.id,
          item.title,
          item.desc,
          item.date,
          item.priority,
          item.isFinish,
          this.isProject
        );
        this.taskContainer.appendChild(newtaskCard.cardBody);
      });
    } else {
      let emptyText = document.createElement("p");
      emptyText.textContent = "empty..";
      this.taskContainer.appendChild(emptyText);
    }
  }
}

export const taskDOM = new TaskDOM();
