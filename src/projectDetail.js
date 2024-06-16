import "./style/projectDetail.css";
import TaskModal from "./component/taskModal";

class ProjectDetail {
  #name;
  #desc;
  #toDo = [];
  constructor() {
    this.detailContainer = document.createElement("div");
    this.detailContainer.classList.add("detail-container");
    this.taskModal = new TaskModal();
  }

  render(name = "", desc = "", toDo = []) {
    this.#name = name;
    this.#desc = desc;
    this.#toDo = toDo;
    this.renderBody();
    this.taskModal.appendModal(this.detailContainer);
    const openTaskModal = this.detailContainer.querySelector(".btn-add-task");
    const closeTaskModal = this.taskModal.overlay.querySelector(
      ".btn-taskform-close"
    );
    closeTaskModal.addEventListener("click", () => this.taskModal.closeModal());
    openTaskModal.addEventListener("click", () => this.taskModal.openModal());
  }

  renderBody() {
    let body = `
    <section class="detail-header">
      <h1 class="project-detail-title">${this.#name}</h1>
        <div class="header-buttons">
          <button class="detail-edit material-icons">edit</button>
          <button class="detail-delete material-icons">delete</button>
        </div>
    </section>
    <section class="detail-desc">
      <p>${this.#desc}</p>
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
}

const projectDetail = new ProjectDetail();

projectDetail.render();

export default projectDetail;
