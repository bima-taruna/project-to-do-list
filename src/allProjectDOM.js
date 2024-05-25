import { storage } from "./storage";
import { searchDOM } from "./helper/searchDOM";
import Card from "./component/card";

class AllProjectDOM {
  constructor() {
    this.allProject = document.createElement("div");
    this.allProject.classList.add("all-project");
    this.allProject.textContent = "Projects";
    this.#fetchProjects();
  }

  get allProjects() {
    return this.allProject;
  }

  render() {
    this.#fetchProjects();
  }

  #fetchProjects() {
    if (storage.usersData.projects.length > 0) {
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
      this.allProject.textContent = "empty";
    }
  }
}

export const allProjectDOM = new AllProjectDOM();
