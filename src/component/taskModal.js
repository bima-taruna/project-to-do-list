import Modal from "./modal";
import allProjectDOM from "../allProjectDOM";
import { user } from "../user";
import { storage } from "../storage";
import indexDOM from "..";
import { taskDOM } from "../taskDOM";
import Project from "../project";

class TaskModal extends Modal {
  constructor() {
    super();
    this.render();
  }

  render() {
    this.currentDate = new Date().toISOString().split("T")[0];
    this.content = `
            <form class="task-form">
                <label for="task-name">Name : </label>
                <input type="text" id="task-name" name="task-name" required minlength="4" maxlength="20" required/>
                <label for="task-desc">Description : </label>
                <textarea id="task-desc" name="task-desc" rows="5" placeholder="Enter your project desc here...."></textarea>
                <div class="second-half">
                  <div> 
                    <label class="label-date" for="task-date">Due Date : </label>
                    <input type="date" id="task-date" name="task-date"/>
                  </div>
                  <div>
                    <label class="label-priority" for="task-priority">Priority : </label>
                    <select name="task-priority" id="task-priority">
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
                <button class="task-add"></button>
            </form>
        `;
    this.modalBody = `
            <div class="task-modal">
                <button class="material-icons btn-taskform-close">close</button>
                ${this.content}
            </div>
        `;
    this.overlay.innerHTML = this.modalBody;
    this.taskForm = this.overlay.querySelector(".task-form");
    this.taskName = this.overlay.querySelector("#task-name");
    this.taskDesc = this.overlay.querySelector("#task-desc");
    this.taskDate = this.overlay.querySelector("#task-date");
    this.taskPriority = this.overlay.querySelector("#task-priority");
    let closeButton = this.overlay.querySelector(".btn-taskform-close");
    this.taskDate.setAttribute("min", this.currentDate);
    closeButton.addEventListener("click", () => {
      this.closeModal();
    });
    this.taskForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.addTask(
        this.taskName.value,
        this.taskDesc.value,
        this.taskDate.value,
        this.taskPriority.value
      );
      this.closeModal();
    });
  }

  changeButtonText(newText) {
    const buttonElement = this.overlay.querySelector(".task-add");
    if (buttonElement) {
      buttonElement.textContent = newText;
    }
  }
  addProjectTag() {
    this.taskForm.classList.add("project");
  }

  removeProjectTag() {
    if (this.taskForm.classList.contains("project")) {
      this.taskForm.classList.remove("project");
    }
  }

  addTask(title, desc, date, priority) {
    const projectIndex = allProjectDOM.projectIndex;
    const project = user.projects[projectIndex];
    if (this.taskForm.classList.contains("project")) {
      project.addTask(title, desc, date, priority);
      taskDOM.render(user.projects[indexDOM.projectDetail.index].task);
    } else {
      user.addTask(title, desc, date, priority);
      taskDOM.render(user.randomTask);
    }
  }

  addEditTag() {
    this.taskForm.classList.add("edit");
  }

  populateTaskForm(index) {
    if (this.taskForm.classList.contains("project")) {
      const data = user.projects[indexDOM.projectDetail.index].task[index];
      this.taskName.value = data.title;
      this.taskDesc.value = data.desc;
      this.taskDate.value = data.date;
      this.taskPriority.value = data.priority;
    } else {
      const data = user.randomTask[index];
      this.taskName.value = data.title;
      this.taskDesc.value = data.desc;
      this.taskDate.value = data.date;
      this.taskPriority.value = data.priority;
    }
  }

  removeEditTag() {
    if (this.taskForm.classList.contains("edit")) {
      this.taskForm.classList.remove("edit");
    }
  }

  resetForm() {
    this.taskName.value = "";
    this.taskDesc.value = "";
    this.taskDate.value = "";
    this.taskPriority.value = "";
  }
}

export default TaskModal;
