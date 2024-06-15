import "./style/projectDetail.css";
import TaskModal from "./component/taskModal";

class ProjectDetail {
  constructor() {
    this.detailContainer = document.createElement("div");
    this.detailContainer.classList.add("detail-container");
    this.taskModal = new TaskModal();
  }

  render(name = "", desc = "", toDo = []) {
    let body = `
    <section class="detail-header">
      <h1 class="project-detail-title">${name}</h1>
        <div class="header-buttons">
          <button class="detail-edit material-icons">edit</button>
          <button class="detail-delete material-icons">delete</button>
        </div>
    </section>
    <section class="detail-desc">
      <p>${desc}</p>
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
    this.taskModal.appendModal(this.detailContainer);
    return this.detailContainer;
  }
}

const projectDetail = new ProjectDetail();

projectDetail.render();

export default projectDetail;
