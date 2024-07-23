import { distanceDateToNow } from "../helper/distanceToNow.js";
import indexDOM from "../index.js";
import { storage } from "../storage.js";
import "../style/taskCardStyle.css";
import { taskDOM } from "../taskDOM.js";
import { taskFilter } from "../taskFilters.js";
import { user } from "../user.js";

class TaskCard {
  cardBody;
  taskCardIndex;
  checkBox;
  constructor(
    index,
    idCode,
    title,
    desc,
    date,
    priority,
    isFinish,
    isProject = false
  ) {
    this.taskCardIndex = index;
    this.title = title;
    this.desc = desc;
    this.date = date;
    this.idCode = idCode;
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
                        <div class="task-date">due date : ${this.dateFormatter.resultString}</div>
                        <div class="task-priority">priority : ${this.priority}</div>
                </div>
                <div class="task-buttons">
                    <button class="material-icons task-card-edit">edit</button>
                    <button class="material-icons task-card-delete">delete</button>
                </div>
                
          
    `;
    this.cardBody.innerHTML = this.compactContent;
    this.deleteButton = this.cardBody.querySelector(".task-card-delete");
    this.editButton = this.cardBody.querySelector(".task-card-edit");
    this.cardBody.prepend(this.checkBox);
    this.cardBody.addEventListener("click", (e) => this.checkCardTarget(e));
    this.checkBoxCheck();
    this.addListener();
  }

  addListener() {
    this.deleteButton.addEventListener("click", () =>
      this.deleteTask(this.idCode)
    );
    this.editButton.addEventListener("click", () =>
      this.openTaskModal(this.idCode)
    );
    this.checkBox.addEventListener("click", () => this.updateTaskStatus());
  }

  toogleCardContent() {
    if (!this.cardBody.classList.contains("extended")) {
      this.cardBody.classList.add("extended");
      this.cardBody.innerHTML = this.extendedContent;
      this.priorityColor();
      this.dateColor();
      this.checkBoxCheck();
      this.cardBody.prepend(this.checkBox);
    } else {
      this.cardBody.classList.remove("extended");
      this.cardBody.innerHTML = this.compactContent;
      this.cardBody.prepend(this.checkBox);
    }
    this.deleteButton = this.cardBody.querySelector(".task-card-delete");
    this.editButton = this.cardBody.querySelector(".task-card-edit");
    this.addListener();
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
    if (this.dateFormatter.isNow || this.dateFormatter.isPast) {
      dateTag.style.backgroundColor = "#ff4a4a";
    } else {
      dateTag.style.backgroundColor = "#91ffc8";
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
   * The `updateTaskStatus` function updates the status of a task based on whether it belongs to a
   * project or not.
   */
  updateTaskStatus() {
    if (this.isProject) {
      user.projects[indexDOM.projectDetail.index].updateTaskStatus(
        this.idCode,
        this.checkBox.checked
      );
    } else {
      user.updateTaskStatus(this.idCode, this.checkBox.checked);
    }
    storage.usersData = user;
    this.checkBoxCheck();
  }

  /**
   * The `deleteTask` function removes a task from either a project or the user's tasks and updates the
   * task display accordingly.
   * @param id - The `id` parameter in the `deleteTask` function represents the unique identifier of
   * the task that needs to be deleted. This identifier is used to locate and remove the specific task
   * from the user's task list.
   */
  deleteTask(id) {
    if (this.isProject) {
      user.projects[indexDOM.projectDetail.index].deleteTask(this.idCode);
      taskDOM.fetchTask(user.projects[indexDOM.projectDetail.index].task);
    } else {
      user.deleteTask(id);
      taskDOM.render(user.randomTask);
      taskFilter.render("All Tasks", taskDOM.taskContainer);
      indexDOM.changeContent(taskFilter.container);
    }
    storage.usersData = user;
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

  openTaskModal(id) {
    indexDOM.taskModal.changeButtonText("Update");
    indexDOM.taskModal.addEditTag();
    if (this.isProject) {
      indexDOM.taskModal.addProjectTag();
    } else {
      indexDOM.taskModal.removeProjectTag();
    }
    indexDOM.taskModal.populateTaskForm(id);
    indexDOM.taskModal.taskUniqueId = id;
    indexDOM.taskModal.openModal();
  }
}

export default TaskCard;
