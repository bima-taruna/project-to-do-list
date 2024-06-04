import { storage } from "./storage";
import { searchDOM } from "./helper/searchDOM";
import { user } from "./user";
import Card from "./component/card";
import indexDOM from ".";
import ProjectModal from "./component/projectModal";
import ProjectDetail from "./projectDetail";

class AllProjectDOM {
  #projectEditModal;
  #editProjectName;
  #editProjectDesc;
  #editProjectForm;
  #projectEditCloseButton;
  #projectIndex;
  constructor() {
    this.allProject = document.createElement("div");
    this.allProject.classList.add("all-project");
    this.#fetchProjects();
  }

  get allProjects() {
    return this.allProject;
  }

  render() {
    this.#fetchProjects();
    this.#appendEditProjectInput(this.allProject).then(() => {
      this.#editProjectForm = document.querySelector(".edit-project-form");
      this.#editProjectName = document.getElementById("edit-project-name");
      this.#editProjectDesc = document.getElementById("edit-project-desc");
      this.#projectEditCloseButton = document.querySelector(
        ".btn-edit-project-close"
      );

      this.#projectEditCloseButton.addEventListener("click", () => {
        this.#projectEditModal.closeModal();
      });

      this.#editProjectForm.addEventListener("submit", (e) => {
        e.preventDefault();
        user.updateProject(
          this.#projectIndex,
          this.#editProjectName.value,
          this.#editProjectDesc.value
        );
        storage.usersData = user;
        indexDOM.fetchProjectName();
        this.render();
      });
    });

    this.allProject.addEventListener("click", (e) => this.#deleteProject(e));

    this.allProject.addEventListener("click", (e) =>
      this.#openEditProjectModal(e)
    );

    this.allProject.addEventListener("click", (e) => {
      this.#seeProjectDetail(e);
    });
  }

  #fetchProjects() {
    this.allProject.textContent = "Projects";
    if (storage.usersData && storage.usersData.projects.length > 0) {
      while (this.allProject.children.length > 0) {
        this.allProject.childNodes.forEach((item) => {
          this.allProject.removeChild(item);
        });
      }
      const projectName = storage.usersData.projects.map(
        (project) => project.name
      );
      projectName.forEach((item) => {
        let newCard = new Card(item);
        this.allProject.appendChild(newCard.createCardBody("project-card"));
      });
    } else {
      this.allProject.textContent = "empty...";
    }
  }

  #seeProjectDetail(event) {
    const { target } = event;
    const targetElement = target.closest(".body-div");
    if (targetElement) {
      const i = searchDOM(targetElement.closest(".project-card"));
      const data = user.getProjectById(i);
      console.log(data);
      const projectDetail = new ProjectDetail(
        data.name,
        data.description,
        data.toDo
      );
      indexDOM.changeContent(projectDetail.render());
    }
  }

  #openEditProjectModal(event) {
    const { target } = event;
    const targetElement = target.closest(".project-card-edit");
    if (targetElement) {
      let i = searchDOM(targetElement.closest(".project-card"));
      this.#projectIndex = i;
      this.#populateEditModal(i);
      this.#projectEditModal.openModal();
    }
  }

  #populateEditModal(index) {
    const data = user.getProjectById(index);
    this.#editProjectName.value = data.name;
    this.#editProjectDesc.value = data.description;
  }

  async #appendEditProjectInput(parent) {
    this.#projectEditModal = new ProjectModal({
      projectName: "edit-project-form",
      className: "project-modal",
      closeButtonClassName: "btn-edit-project-close",
      label: "edit-",
      buttonText: "Update",
    });
    parent.appendChild(this.#projectEditModal.overlay);
  }

  #deleteProject(event) {
    const { target } = event;
    const targetElement = target.closest(".project-card-delete");
    if (targetElement) {
      let i = searchDOM(targetElement.closest(".project-card"));
      user.deleteProject(i);
      storage.usersData = user;
      this.render();
      indexDOM.fetchProjectName();
    }
  }
}

let allProjectDOM = new AllProjectDOM();
allProjectDOM.render();
export default allProjectDOM;
