import { storage } from "../storage.js";
import "../style/taskCardStyle.css";
import { taskDOM } from "../taskDOM.js";
import { user } from "../user.js";

class TaskCard {
  cardBody;
  taskCardIndex;
  checkBox;
  constructor(index, title, desc, date, priority, isFinish) {
    this.taskCardIndex = index;
    this.title = title;
    this.desc = desc;
    this.date = date;
    this.priority = priority;
    this.isFinish = isFinish;
    this.cardBody = document.createElement("div");
    this.cardBody.classList.add("task-card");
    this.checkBox = document.createElement("input");
    this.checkBox.type = "checkbox";
    this.checkBox.id = `task-isFinish-${this.taskCardIndex}`;
    this.checkBox.name = "isFinish";
    this.checkBox.checked = this.isFinish;

    this.compactContent = `
            <section class="task-card-header">
                <div class="task-title">${this.title}</div>
                <div class="task-buttons">
                    <button class="material-icons task-edit">edit</button>
                    <button class="material-icons task-delete">delete</button>
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
    this.cardBody.prepend(this.checkBox);
    if (this.checkBox.checked) {
      this.cardBody.classList.add("completed");
    } else {
      this.cardBody.classList.remove("completed");
    }
    this.checkBox.addEventListener("click", () => {
      user.task[this.taskCardIndex].isFinish = this.checkBox.checked;
      storage.usersData = user;
      taskDOM.render(storage.usersData.task);
    });

    this.cardBody.addEventListener("click", (e) => {
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
    });
  }

  toogleCardContent() {
    if (!this.cardBody.classList.contains("extended")) {
      this.cardBody.classList.add("extended");
      this.cardBody.innerHTML = this.extendedContent;
      this.priorityColor();
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
}

export default TaskCard;
