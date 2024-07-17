import "./style/style.css";
import { user } from "./user";
import { storage } from "./storage";
import allProjectDOM from "./allProjectDOM";
import Modal from "./component/modal";
import ProjectModal from "./component/projectModal";
import TaskModal from "./component/taskModal";
import ProjectDetail from "./projectDetail";
import { taskDOM } from "./taskDOM";
import { taskFilter } from "./taskFilters";
import Project from "./project";

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
  projectDetail;

  constructor() {
    this.#fetchDataFromStorage();
    this.main = document.querySelector("main");
    this.#editNameBtn = document.getElementById("btn-edit-name");
    this.#addProjectButton = document.getElementById("add-project");
    this.#projectList = document.querySelector(".project-list");
    this.#content = document.getElementById("content");
    taskDOM.render(user.randomTask);
    taskFilter.render("All Tasks", taskDOM.taskContainer);
    this.changeContent(taskFilter.container);
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
    this.taskModal.appendModal(this.main);
    this.fetchProjectName();
    this.hasManyProjects();
    this.closeNameModalButton = document.querySelector(".btn-name-close");
    this.changeUserNameButton = document.querySelector(".btn-name-change");
    let filters = document.getElementById("filters");
    this.allTask = filters.children[0];
    this.#userNameInput = document.getElementById("user-name");
    this.projectNameInput = document.getElementById("project-name");
    this.projectDescInput = document.getElementById("project-desc");
    this.addListener();
  }

  addListener() {
    if (user.projects.length > 0) {
      let sidebarProjects = this.#projectList.querySelectorAll(".project");
      sidebarProjects.forEach((item, index) => {
        item.addEventListener("click", () => {
          allProjectDOM.projectIndex = index;
          this.projectDetail = new ProjectDetail(index);
          this.changeContent(this.projectDetail.detailContainer);
        });
      });
    }
    this.allTask.addEventListener("click", () => {
      taskDOM.render(user.randomTask);
      taskFilter.render("All Tasks", taskDOM.taskContainer);
      this.changeContent(taskFilter.container);
    });
    this.#editNameBtn.addEventListener("click", () =>
      this.#nameModal.openModal()
    );
    this.#addProjectButton.addEventListener("click", () => {
      this.removeDetailTag();
      this.removeEditTag();
      this.projectModal.projectNameInput.value = "";
      this.projectModal.projectDescInput.value = "";
      this.projectModal.changeButtonText("Add");
      this.projectModal.openModal();
    });
    this.closeNameModalButton.addEventListener("click", () => {
      this.#nameModal.closeModal();
    });
    this.changeUserNameButton.addEventListener("click", () => {
      this.changeUserName();
    });
  }

  /**
   * The function `fetchDataFromStorage` checks if `storage.usersData` exists and assigns its values to
   * the `user` object if it does.
   */
  #fetchDataFromStorage() {
    if (!storage.usersData) {
      storage.usersData = user;
    } else {
      user.name = storage.usersData.name;
      user.projects = storage.usersData.projects.map(
        (project) =>
          new Project(project.name, project.description, project.task)
      );
      user.randomTask = storage.usersData.randomTask;
    }
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

  //fetch project name to the sidebar and check the condition if project is 4 or more
  fetchProjectName() {
    if (user.projects.length > 0) {
      while (this.#projectList.children.length > 0) {
        this.#projectList.childNodes.forEach((item) => {
          this.#projectList.removeChild(item);
        });
      }
      const projectName = user.projects.map((project) => project.name);
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

  //check if project is 4 or more
  hasManyProjects() {
    if (user.projects.length > 3) {
      this.#allProjectButton = document.createElement("div");
      this.#allProjectButton.classList.add("btn-all-project");
      this.#allProjectButton.textContent = "See all projects";
      this.#projectList.appendChild(this.#allProjectButton);
      this.#allProjectButton.addEventListener("click", () => {
        this.changeContent(allProjectDOM.allProjects);
      });
    }
  }

  changeUserName() {
    user.name = this.#userNameInput.value;
    storage.usersData = user;
    this.#fetchUserName();
    this.#nameModal.closeModal();
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
