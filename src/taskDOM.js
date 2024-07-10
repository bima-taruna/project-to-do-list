// import "./style/allTask.css";
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
      tasks.forEach((item, index) => {
        let newtaskCard = new TaskCard(
          index,
          item.title,
          item.desc,
          item.date,
          item.priority,
          item.isFinish
        );
        this.taskContainer.appendChild(newtaskCard.cardBody);
      });
    } else {
      this.taskContainer.textContent = "empty..";
    }
  }
}

export const taskDOM = new TaskDOM();
