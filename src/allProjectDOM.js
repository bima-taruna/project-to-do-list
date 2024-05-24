import { storage } from "./storage";
import Card from "./component/card";

class AllProjectDOM {
  constructor() {
    this.allProject = document.createElement("div");
    this.allProject.classList.add("all-project");
  }

  render() {
    this.#fetchProjects();
    return this.allProject;
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
