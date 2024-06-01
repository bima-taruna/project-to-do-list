import { storage } from "./storage";
import { searchDOM } from "./helper/searchDOM";
import { user } from "./user";
import Card from "./component/card";
import indexDOM from ".";
import ProjectModal from "./component/projectModal";

class AllProjectDOM {
  #projectEditButton;
  #projectEditModal;
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
    this.#appendEditProjectInput();
    this.allProject.addEventListener("click", (e) => this.#seeProjectDetail(e));
    // this.allProject.addEventListener("click", () => )
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
    const targetElement = target.closest(".project-card");
    if (targetElement) {
      let i = searchDOM(targetElement);
      console.log(user.getProjectById(i));
    }
  }

  #appendEditProjectInput() {
    this.#projectEditModal = new ProjectModal(
      "project-modal",
      "btn-project-close",
      "edit-project-form",
      "edit-"
    );
    this.allProject.appendChild(this.#projectEditModal.overlay);
  }
}

let allProjectDOM = new AllProjectDOM();
allProjectDOM.render();
export default allProjectDOM;
