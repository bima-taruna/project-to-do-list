// import "./style/allTask.css";
import indexDOM from ".";
import TaskCard from "./component/taskCard";
import { searchDOM } from "./helper/searchDOM";
import { storage } from "./storage";
import { user } from "./user";

class TaskDOM {
  constructor() {
    this.taskContainer = document.createElement("div");
    this.taskContainer.classList.add("task-container");
  }

  render(tasks, isProject = false) {
    this.isProject = isProject;
    this.fetchTask(tasks);
    this.taskContainer.addEventListener("click", (e) => {
      this.#deleteTask(e);
    });
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

  #deleteTask(event) {
    const { target } = event;
    const targetElement = target.closest(".task-card-delete");
    if (targetElement) {
      let targetClosest = targetElement.closest(".task-card");
      let i = searchDOM(targetClosest);
      if (i !== -1 && this.isProject) {
        user.projects[indexDOM.projectDetail.index].deleteTask(i);
        storage.usersData = user;
        this.fetchTask(user.projects[indexDOM.projectDetail.index].task);
      } else if (i !== -1 && !this.isProject) {
        user.deleteTask(i);
        storage.usersData = user;
        this.fetchTask(user.randomTask);
      }
    } else {
      console.log("task card not found");
    }
  }
}

export const taskDOM = new TaskDOM();
