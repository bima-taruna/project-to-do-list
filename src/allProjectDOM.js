import "./style/allProjectStyle.css";
import { storage } from "./storage";
import { searchDOM } from "./helper/searchDOM";
import { user } from "./user";
import Card from "./component/card";
import indexDOM from ".";
import ProjectDetail from "./projectDetail";

class AllProjectDOM {
  projectIndex;
  constructor() {
    this.allProject = document.createElement("div");
    this.allProject.classList.add("all-project");
    this.fetchProjects();
  }

  get allProjects() {
    return this.allProject;
  }

  render() {
    this.fetchProjects();
    this.allProject.addEventListener("click", (e) => {
      this.#deleteProject(e);
    });

    this.allProject.addEventListener("click", (e) =>
      this.#openEditProjectModal(e)
    );

    this.allProject.addEventListener("click", (e) => {
      this.#seeProjectDetail(e);
    });
  }

  fetchProjects() {
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
      this.projectIndex = searchDOM(targetElement.closest(".project-card"));
      this.addEditTag();
      this.#populateEditModal(this.projectIndex);
      indexDOM.projectModal.changeButtonText("Update");
      // console.log(indexDOM.projectModal.changeButtonText("Update"));
      indexDOM.projectModal.openModal();
    }
  }

  #populateEditModal(index) {
    const data = user.getProjectById(index);
    indexDOM.projectNameInput.value = data.name;
    indexDOM.projectDescInput.value = data.description;
  }

  #deleteProject(event) {
    const { target } = event;
    const targetElement = target.closest(".project-card-delete");
    if (targetElement) {
      let targetClosest = targetElement.closest(".project-card");
      let i = searchDOM(targetClosest);
      console.log(i);
      user.deleteProject(i);
      storage.usersData = user;
      this.fetchProjects();
      indexDOM.fetchProjectName();
    }
  }

  addEditTag() {
    let projectForm = document.querySelector(".project-form");
    projectForm.classList.add("edit");
    console.log(projectForm);
  }
}

let allProjectDOM = new AllProjectDOM();
allProjectDOM.render();
export default allProjectDOM;
