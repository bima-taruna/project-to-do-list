import "./style.css";
import { user } from "./user";
import { storage } from "./storage";
import Modal from "./component/modal";

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
  }

  render() {
    console.log(user);
    console.log(storage.usersData);
    this.#fetchUserName();
    this.#appendUserNameInput();
    this.#appendProjectDataInput();
    this.#fetchProjectName();
    let closeNameModalButton = document.querySelector(".btn-name-close");
    let closeProjectModalButton = document.querySelector(".btn-project-close");
    let changeUserNameButton = document.querySelector(".btn-name-change");
    let projectForm = document.querySelector(".project-data");
    this.#userNameInput = document.getElementById("user-name");
    this.#projectNameInput = document.getElementById("project-name");
    this.#projectDescInput = document.getElementById("project-desc");

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
    let form = `
      <form class="project-data">
        <label for="project-name">Name : </label>
        <input type="text" id="project-name" name="project-name" required minlength="4" maxlength="20" required/>
        <label for="project-desc">Description : </label>
        <textarea id="project-desc" name="project-desc" rows="5" placeholder="Enter your project desc here...."></textarea>
        <button class="project-add">Add</button>
      </form>
    `;
    this.#projectModal = new Modal(form, "project-modal", "btn-project-close");
    this.#main.appendChild(this.#projectModal.overlay);
  }

  #fetchProjectName() {
    if (storage.usersData.projects.length > 0) {
      const projectName = storage.usersData.projects.map(
        (project) => project.name
      );
      projectName.forEach((item) => {
        let newLi = document.createElement("li");
        newLi.classList.add("project");
        newLi.textContent = item;
        this.#projectList.appendChild(newLi);
      });
    } else {
      let emptyText = document.createElement("div");
      emptyText.classList.add("empty");
      emptyText.style.fontStyle = "italic";
      emptyText.textContent = "empty";
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
    this.#fetchProjectName();
    this.#projectModal.closeModal();
  }
}

let indexDOM = new IndexDOM();

indexDOM.render();
