import "./style/style.css";
import { user } from "./user";
import { storage } from "./storage";
import allProjectDOM from "./allProjectDOM";
import Modal from "./component/modal";
import ProjectModal from "./component/projectModal";
import ProjectDetail from "./projectDetail";

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
    // const projectDetail = new ProjectDetail(
    //   "ngoding",
    //   "    Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, voluptas accusamus optio maxime aliquam officiis odio perspiciatis doloribus ullam placeat voluptatem veniam ratione, incidunt cum veritatis neque! Ab, distinctio reiciendis",
    //   []
    // );
    this.changeContent(allProjectDOM.allProjects);
    // this.changeContent(projectDetail.render());
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
    this.#projectModal = new ProjectModal({
      className: "project-modal",
      closeButtonClassName: "btn-project-close",
      projectName: "add-project-form",
      buttonText: "Add",
    });
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
      let index =
        storage.usersData.projects.length < 4
          ? storage.usersData.projects.length - 1
          : 3;
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
