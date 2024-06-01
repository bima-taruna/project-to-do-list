import "./style.css";
import "./allProjectStyle.css";
import { user } from "./user";
import { storage } from "./storage";
import allProjectDOM from "./allProjectDOM";
import Modal from "./component/modal";
import ProjectModal from "./component/projectModal";

if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
}

class IndexDOM {
  #main;
  #editNameBtn;
  #nameModal;
  #userNameInput;
  #projectModal;
  #addProjectButton;
  #projectNameInput;
  #projectDescInput;
  #projectList;
  #allProjectButton;
  #content;

  constructor() {
    if (!storage.usersData) {
      storage.usersData = user;
    } else {
      user.name = storage.usersData.name;
      user.projects = storage.usersData.projects;
    }
    this.#main = document.querySelector("main");
    this.#editNameBtn = document.getElementById("btn-edit-name");
    this.#addProjectButton = document.getElementById("add-project");
    this.#projectList = document.querySelector(".project-list");
    this.#content = document.getElementById("content");
    this.changeContent(allProjectDOM.allProjects);
  }

  render() {
    console.log(user);
    console.log(storage.usersData);
    this.#fetchUserName();
    this.#appendUserNameInput();
    this.#appendProjectDataInput();
    this.fetchProjectName();
    this.hasManyProjects();
    let closeNameModalButton = document.querySelector(".btn-name-close");
    let closeProjectModalButton = document.querySelector(".btn-project-close");
    let changeUserNameButton = document.querySelector(".btn-name-change");
    let projectForm = document.querySelector(".add-project-form");
    console.log(projectForm);
    this.#userNameInput = document.getElementById("user-name");
    this.#projectNameInput = document.getElementById("project-name");
    this.#projectDescInput = document.getElementById("project-desc");
    console.log(this.#projectList.children);
    this.#editNameBtn.addEventListener("click", () =>
      this.#nameModal.openModal()
    );
    this.#addProjectButton.addEventListener("click", () =>
      this.#projectModal.openModal()
    );
    closeNameModalButton.addEventListener("click", () => {
      this.#nameModal.closeModal();
    });
    closeProjectModalButton.addEventListener("click", () =>
      this.#projectModal.closeModal()
    );
    changeUserNameButton.addEventListener("click", () => {
      this.changeUserName();
    });
    projectForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.addProject(
        this.#projectNameInput.value,
        this.#projectDescInput.value
      );
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
    this.#main.appendChild(this.#nameModal.overlay);
  }

  #appendProjectDataInput() {
    this.#projectModal = new ProjectModal(
      "project-modal",
      "btn-project-close",
      "add-project-form"
    );
    this.#main.appendChild(this.#projectModal.overlay);
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
      for (let i = 0; i < 3; i++) {
        let newLi = document.createElement("li");
        newLi.classList.add("project");
        newLi.textContent = projectName[i];
        this.#projectList.appendChild(newLi);
      }
    } else {
      let emptyText = document.createElement("div");
      emptyText.classList.add("empty");
      emptyText.style.fontStyle = "italic";
      emptyText.textContent = "empty";
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
    allProjectDOM.render();
    this.#projectModal.closeModal();
  }

  changeContent(contentNode) {
    while (this.#content.children.length > 0) {
      this.#content.removeChild(this.#content.firstChild);
    }
    this.#content.appendChild(contentNode);
  }
}

let indexDOM = new IndexDOM();

indexDOM.render();

export default indexDOM;
