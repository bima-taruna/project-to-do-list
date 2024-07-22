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
    this.taskContainer.addEventListener("click", (e) => {
      console.log(this.taskIndex);
      this.#openEditTaskModal(e);
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

  #openEditTaskModal(event) {
    const { target } = event;
    const targetElement = target.closest(".task-card-edit");
    const parentNode = this.taskContainer.parentNode.className;
    if (targetElement) {
      let targetClosest = targetElement.closest(".task-card");
      this.taskIndex = searchDOM(targetClosest);
      indexDOM.taskModal.changeButtonText("Update");
      indexDOM.taskModal.addEditTag();
      if (parentNode === "detail-container") {
        indexDOM.taskModal.addProjectTag();
      } else {
        indexDOM.taskModal.removeProjectTag();
      }
      indexDOM.taskModal.populateTaskForm(this.taskIndex);
      indexDOM.taskModal.openModal();
    }
  }
}

export const taskDOM = new TaskDOM();
