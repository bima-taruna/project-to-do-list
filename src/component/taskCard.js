import { distanceDateToNow } from "../helper/distanceToNow.js";
import indexDOM from "../index.js";
import { storage } from "../storage.js";
import "../style/taskCardStyle.css";
import { user } from "../user.js";

class TaskCard {
  cardBody;
  taskCardIndex;
  checkBox;
  constructor(index, title, desc, date, priority, isFinish, isProject = false) {
    this.taskCardIndex = index;
    this.title = title;
    this.desc = desc;
    this.date = date;
    this.dateFormatter = distanceDateToNow(this.date);
    this.priority = priority;
    this.isFinish = isFinish;
    this.cardBody = document.createElement("div");
    this.cardBody.classList.add("task-card");
    this.checkBox = document.createElement("input");
    this.checkBox.type = "checkbox";
    this.checkBox.id = `task-isFinish-${this.taskCardIndex}`;
    this.checkBox.name = "isFinish";
    this.checkBox.checked = this.isFinish;
    this.isProject = isProject;

    this.compactContent = `
            <section class="task-card-header">
                <div class="task-title">${this.title}</div>
                <div class="task-buttons">
                    <button class="material-icons task-card-edit">edit</button>
                    <button class="material-icons task-card-delete">delete</button>
                </div>
            </section>
      
        `;
    this.extendedContent = `
                <div class="task-title">${this.title}</div>
                <p class="task-desc">${this.desc}</p>
                <div class="task-tags">
                        <div class="task-date">due date : ${this.date}</div>
                        <div class="task-priority">priority : ${this.priority}</div>
                </div>
                <div class="task-buttons">
                    <button class="material-icons task-card-edit">edit</button>
                    <button class="material-icons task-card-delete">delete</button>
                </div>
                
          
    `;
    this.cardBody.innerHTML = this.compactContent;
    this.render();
    this.addListener();
  }

  addListener() {
    this.cardBody.addEventListener("click", (e) => this.checkCardTarget(e));
    this.checkBox.addEventListener("click", () => this.isTaskBelongToProject());
  }

  render() {
    this.cardBody.prepend(this.checkBox);
    this.checkBoxCheck();
  }

  toogleCardContent() {
    if (!this.cardBody.classList.contains("extended")) {
      this.cardBody.classList.add("extended");
      this.cardBody.innerHTML = this.extendedContent;
      this.priorityColor();
      this.checkBoxCheck();
      this.cardBody.appendChild(this.checkBox);
    } else {
      this.cardBody.classList.remove("extended");
      this.cardBody.innerHTML = this.compactContent;
      this.cardBody.prepend(this.checkBox);
    }
  }

  priorityColor() {
    let taskPriority = this.cardBody.querySelector(".task-priority");
    switch (this.priority) {
      case "high":
        taskPriority.style.backgroundColor = "#ff4a4a";
        break;
      case "medium":
        taskPriority.style.backgroundColor = "#fffd97";
        break;
      default:
        taskPriority.style.backgroundColor = "#91ffc8";
        break;
    }
  }

  dateColor() {
    let dateTag = this.cardBody.querySelector(".task-date");
    if (this.dateFormatter.isNow) {
      dateTag.style.backgroundColor = "red";
    } else {
      dateTag.style.backgroundColor = "green";
    }
  }

  checkBoxCheck() {
    if (this.checkBox.checked) {
      this.cardBody.classList.add("completed");
    } else {
      this.cardBody.classList.remove("completed");
    }
  }

  /**
   * The function `isTaskBelongToProject` checks if a task belongs to a project and updates its
   * completion status accordingly.
   */
  isTaskBelongToProject() {
    const randomTask = user.randomTask;
    const randomTasks = user.randomTask[this.taskCardIndex];
    const projects = user.projects;
    if (this.isProject) {
      const projectTask = user.projects[indexDOM.projectDetail.index].task;
      projectTask.forEach((task) => {
        randomTask.forEach((task2) => {
          if (task.id === task2.id) {
            task2.isFinish = this.checkBox.checked;
            task.isFinish = this.checkBox.checked;
          }
        });
      });
    } else {
      randomTasks.isFinish = this.checkBox.checked;
      projects.forEach((project) => {
        project.task.forEach((task) => {
          if (task.id === randomTasks.id) {
            task.isFinish = this.checkBox.checked;
          }
        });
      });
    }
    storage.usersData = user;
    this.render();
  }

  checkCardTarget(e) {
    /* This code snippet is a conditional statement that checks if the clicked element on the task card
    matches specific elements within the task card. If the clicked element matches any of the
    specified elements (such as the task card header, title, description, or tags), the
    `toogleCardContent()` method is called to toggle the content display of the task card between
    compact and extended views. If the clicked element does not match any of the specified elements,
    the function returns without performing any action. */
    if (
      e.target === e.currentTarget ||
      e.target.classList.contains("task-card-header") ||
      e.target.classList.contains("task-title") ||
      e.target.classList.contains("task-desc") ||
      e.target.classList.contains("task-tags")
    ) {
      this.toogleCardContent();
    } else {
      return;
    }
  }

  checkMatchTask(item1, item2, checkBox) {
    if (item1.id === item2.id) {
      item2.isFinish = checkBox.checked;
      item1.isFinish = checkBox.checked;
    }
  }
}

export default TaskCard;
