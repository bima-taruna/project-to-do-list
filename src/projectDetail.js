import "./style/projectDetail.css";

class ProjectDetail {
  constructor(name, desc, toDo) {
    this.name = name;
    this.desc = desc;
    this.toDo = toDo;
    this.detailContainer = document.createElement("div");
    this.detailContainer.classList.add("detail-container");
  }

  render() {
    let body = `
        <section class="detail-header">
            <h1 class="project-detail-title">${this.name}</h1>
            <div class="header-buttons">
              <button class="detail-edit material-icons">edit</button>
              <button class="detail-delete material-icons">delete</button>
            </div>
        </section>
        <section class="detail-desc">
            <p>${this.desc}</p>
        </section>
        <section class="task">
            <div class="task-header">
              <h2>Task</h2>
              <button class="material-icons">add</button>
            </div>
            <div class="task-list"></div>
        </section>
    `;
    this.detailContainer.innerHTML = body;
    return this.detailContainer;
  }
}

export default ProjectDetail;
