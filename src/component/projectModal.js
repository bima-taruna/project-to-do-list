import Modal from "./modal";
import indexDOM from "..";
import { storage } from "../storage";
import { user } from "../user";
import allProjectDOM from "../allProjectDOM";
class ProjectModal extends Modal {
  projectNameInput;
  projectDescInput;
  constructor({ className, closeButtonClassName, formName, label = "" }) {
    super(className, closeButtonClassName);
    this.formName = formName;
    this.className = className;
    this.closeButtonClassName = closeButtonClassName;
    this.label = label;
    this.render();
  }

  render() {
    this.content = `
    <form class="${this.formName}">
        <label for="${this.label}project-name">Name : </label>
        <input type="text" id="${this.label}project-name" name="${this.label}project-name" required minlength="4" maxlength="40" required/>
        <label for="${this.label}project-desc">Description : </label>
        <textarea id="${this.label}project-desc" name="${this.label}project-desc" rows="5" placeholder="Enter your project desc here...."></textarea>
        <button class="${this.label}project-add"></button>
    </form>
    `;

    this.modalBody = `
        <div class="${this.className}">
        <button class="${this.closeButtonClassName} material-icons">close</button>
            ${this.content}
        </div>
    `;
    this.overlay.innerHTML = this.modalBody;
    this.closeButton = this.overlay.querySelector(".btn-project-close");
    this.projectForm = this.overlay.querySelector(".project-form");
    this.projectNameInput = this.projectForm.querySelector("#project-name");
    this.projectDescInput = this.projectForm.querySelector("#project-desc");
    this.closeButton.addEventListener("click", () => {
      this.closeModal();
    });
    this.projectForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (this.projectForm.classList.contains("edit")) {
        this.updateProject(
          allProjectDOM.projectIndex,
          this.projectNameInput.value,
          this.projectDescInput.value
        );
      } else {
        this.addProject(
          this.projectNameInput.value,
          this.projectDescInput.value
        );
      }
    });
  }

  changeButtonText(newText) {
    const buttonElement = this.overlay.querySelector(
      `.${this.label}project-add`
    );
    if (buttonElement) {
      buttonElement.textContent = newText;
    }
  }

  updateProject(index, name, desc) {
    user.updateProject(index, name, desc);
    storage.usersData = user;
    indexDOM.fetchProjectName();
    this.closeModal();
    if (this.projectForm.classList.contains("detail")) {
      if (allProjectDOM.projectDetail) {
        allProjectDOM.projectDetail.render();
      }
      indexDOM.projectDetail.render();
      indexDOM.addListener();
    }
    allProjectDOM.render();
  }

  addProject(name, description) {
    user.addProject(name, description);
    storage.usersData = user;
    indexDOM.fetchProjectName();
    indexDOM.hasManyProjects();
    indexDOM.addListener();
    allProjectDOM.fetchProjects();
    this.closeModal();
  }
}

export default ProjectModal;
