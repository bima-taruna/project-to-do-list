import "./style/projectDetail.css";
import indexDOM from ".";
import allProjectDOM from "./allProjectDOM";
import { user } from "./user";
import { taskDOM } from "./taskDOM";

class ProjectDetail {
  #data;
  constructor(index) {
    this.index = index;
    this.detailContainer = document.createElement("div");
    this.detailContainer.classList.add("detail-container");
    this.#data = user.getProjectById(this.index);
    this.render();
  }

  render() {
    this.renderBody();
    taskDOM.render(user.projects[this.index].task, true);
    this.detailContainer.appendChild(taskDOM.taskContainer);
    const openTaskModal = this.detailContainer.querySelector(".btn-add-task");
    const btnDetailEdit = this.detailContainer.querySelector(".detail-edit");
    openTaskModal.addEventListener("click", () => {
      indexDOM.taskModal.changeButtonText("Add");
      indexDOM.taskModal.addProjectTag();
      indexDOM.taskModal.openModal();
    });
    btnDetailEdit.addEventListener("click", () => this.openDetailEditModal());
  }

  renderBody() {
    let body = `
    <section class="detail-header">
      <h1 class="project-detail-title">${this.#data.name}</h1>
        <div class="header-buttons">
          <button class="detail-edit material-icons">edit</button>
          <button class="detail-delete material-icons">delete</button>
        </div>
    </section>
    <section class="detail-desc">
      <p>${this.#data.description}</p>
    </section>
    <section class="task">
      <div class="task-header">
        <h2>Task</h2>
        <button class="material-icons btn-add-task">add</button>
      </div>
      <div class="task-list"></div>
    </section>
    `;
    this.detailContainer.innerHTML = body;
  }

  returnContainer() {
    return this.detailContainer;
  }

  openDetailEditModal() {
    allProjectDOM.addEditTag();
    this.addDetailTag();
    allProjectDOM.populateEditModal(allProjectDOM.projectIndex);
    indexDOM.projectModal.changeButtonText("Update");
    indexDOM.projectModal.openModal();
  }

  addDetailTag() {
    let projectForm = document.querySelector(".project-form");
    projectForm.classList.add("detail");
  }
}

export default ProjectDetail;
