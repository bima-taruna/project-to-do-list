import "./style/style.css";
import { user } from "./user";
import { storage } from "./storage";
import allProjectDOM from "./allProjectDOM";
import Modal from "./component/modal";
import ProjectModal from "./component/projectModal";
import TaskModal from "./component/taskModal";

if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
}

class IndexDOM {
  main;
  #editNameBtn;
  #nameModal;
  #userNameInput;
  projectModal;
  #addProjectButton;
  projectNameInput;
  projectDescInput;
  #projectList;
  #allProjectButton;
  #content;
  taskModal;

  constructor() {
    if (!storage.usersData) {
      storage.usersData = user;
    } else {
      user.name = storage.usersData.name;
      user.projects = storage.usersData.projects;
    }
    this.main = document.querySelector("main");
    this.#editNameBtn = document.getElementById("btn-edit-name");
    this.#addProjectButton = document.getElementById("add-project");
    this.#projectList = document.querySelector(".project-list");
    this.#content = document.getElementById("content");
    this.changeContent(allProjectDOM.allProjects);
  }

  render() {
    console.log(user);
    console.log(storage.usersData);
    this.taskModal = new TaskModal();
    this.projectModal = new ProjectModal({
      className: "project-modal",
      closeButtonClassName: "btn-project-close",
      formName: "project-form",
    });
    this.#fetchUserName();
    this.#appendUserNameInput();
    this.projectModal.appendModal(this.main);
    this.fetchProjectName();
    this.hasManyProjects();
    let closeNameModalButton = document.querySelector(".btn-name-close");
    let closeProjectModalButton = document.querySelector(".btn-project-close");
    let changeUserNameButton = document.querySelector(".btn-name-change");
    let projectForm = document.querySelector(".project-form");
    this.#userNameInput = document.getElementById("user-name");
    this.projectNameInput = document.getElementById("project-name");
    this.projectDescInput = document.getElementById("project-desc");
    this.#editNameBtn.addEventListener("click", () =>
      this.#nameModal.openModal()
    );
    this.#addProjectButton.addEventListener("click", () => {
      this.removeDetailTag();
      this.removeEditTag();
      this.projectModal.changeButtonText("Add");
      this.projectModal.openModal();
    });
    closeNameModalButton.addEventListener("click", () => {
      this.#nameModal.closeModal();
    });
    closeProjectModalButton.addEventListener("click", () => {
      this.projectNameInput.value = "";
      this.projectDescInput.value = "";
      this.projectModal.closeModal();
    });
    changeUserNameButton.addEventListener("click", () => {
      this.changeUserName();
    });
    projectForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let projectForm = document.querySelector(".project-form");
      if (projectForm.classList.contains("edit")) {
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

  #fetchUserName() {
    const userName = storage.usersData.name;
    const userNameDOM = document.querySelector(".user-name");
    userNameDOM.textContent = userName;
  }

  #appendUserNameInput() {
    let input = `
    <div class="name-input">
      <label for="user-name">Name : </label>
      <input type="text" id="user-name" name="user-name" required minlength="4" maxlength="10" required/>
      <button class="btn-name-change">Change</button>
    </div>
    `;
    this.#nameModal = new Modal(input, "name-modal", "btn-name-close");
    this.main.appendChild(this.#nameModal.overlay);
  }

  fetchProjectName() {
    if (storage.usersData.projects.length > 0) {
      while (this.#projectList.children.length > 0) {
        this.#projectList.childNodes.forEach((item) => {
          this.#projectList.removeChild(item);
        });
      }
      const projectName = storage.usersData.projects.map(
        (project) => project.name
      );
      let index =
        storage.usersData.projects.length < 6
          ? storage.usersData.projects.length - 1
          : 5;
      for (let i = 0; i <= index; i++) {
        let newLi = document.createElement("li");
        newLi.classList.add("project");
        newLi.textContent = projectName[i];
        this.#projectList.appendChild(newLi);
      }
    } else {
      while (this.#projectList.children.length > 0) {
        this.#projectList.childNodes.forEach((item) => {
          this.#projectList.removeChild(item);
        });
      }
      let emptyText = document.createElement("div");
      emptyText.classList.add("empty");
      emptyText.style.fontStyle = "italic";
      emptyText.textContent = "empty";
      this.#projectList.appendChild(emptyText);
    }
  }

  hasManyProjects() {
    if (storage.usersData.projects.length > 3) {
      this.#allProjectButton = document.createElement("div");
      this.#allProjectButton.classList.add("btn-all-project");
      this.#allProjectButton.textContent = "See all projects";
      this.#projectList.appendChild(this.#allProjectButton);
    }
  }

  changeUserName() {
    user.name = this.#userNameInput.value;
    storage.usersData = user;
    this.#fetchUserName();
    this.#nameModal.closeModal();
  }

  addProject(name, description) {
    user.addProject(name, description);
    storage.usersData = user;
    this.fetchProjectName();
    this.hasManyProjects();
    allProjectDOM.fetchProjects();
    this.projectModal.closeModal();
  }

  updateProject(index, name, desc) {
    let projectForm = document.querySelector(".project-form");
    user.updateProject(index, name, desc);
    storage.usersData = user;
    indexDOM.fetchProjectName();
    this.projectModal.closeModal();
    if (projectForm.classList.contains("detail")) {
      allProjectDOM.projectDetail.render();
    }
    allProjectDOM.render();
  }

  changeContent(contentNode) {
    while (this.#content.children.length > 0) {
      this.#content.removeChild(this.#content.firstChild);
    }
    this.#content.appendChild(contentNode);
  }

  removeEditTag() {
    let projectForm = document.querySelector(".project-form");
    if (projectForm.classList.contains("edit")) {
      projectForm.classList.remove("edit");
    }
  }

  removeDetailTag() {
    let projectForm = document.querySelector(".project-form");
    if (projectForm.classList.contains("detail")) {
      projectForm.classList.remove("detail");
    }
  }

  get main() {
    return this.main;
  }
}
let indexDOM = new IndexDOM();

indexDOM.render();

export default indexDOM;
