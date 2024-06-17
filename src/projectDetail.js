import "./style/projectDetail.css";
import indexDOM from ".";
import TaskModal from "./component/taskModal";

class ProjectDetail {
  #name;
  #desc;
  #toDo = [];
  constructor() {
    this.detailContainer = document.createElement("div");
    this.detailContainer.classList.add("detail-container");
  }

  render(name = "", desc = "", toDo = []) {
    this.#name = name;
    this.#desc = desc;
    this.#toDo = toDo;
    this.renderBody();
    indexDOM.taskModal.appendModal(indexDOM.main);
    const openTaskModal = this.detailContainer.querySelector(".btn-add-task");
    const closeTaskModal = indexDOM.taskModal.overlay.querySelector(
      ".btn-taskform-close"
    );
    closeTaskModal.addEventListener("click", () =>
      indexDOM.taskModal.closeModal()
    );
    openTaskModal.addEventListener("click", () => {
      indexDOM.taskModal.changeButtonText("Add");
      indexDOM.taskModal.openModal();
    });
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

export const projectDetail = new ProjectDetail();
