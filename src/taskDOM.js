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
    while (this.taskContainer.children.length > 0) {
      this.taskContainer.childNodes.forEach((item) => {
        this.taskContainer.removeChild(item);
      });
    }
    if (tasks && tasks.length > 0) {
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
      let emptyText = document.createElement("p");
      emptyText.textContent = "empty..";
      this.taskContainer.appendChild(emptyText);
    }
  }
}

export const taskDOM = new TaskDOM();
