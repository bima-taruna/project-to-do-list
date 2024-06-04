class ProjectDetail {
  constructor(name, desc, toDo) {
    this.name = name;
    this.desc = desc;
    this.toDo = toDo;
    this.detailContainer = document.createElement("div");
    detailContainer.classList.add("detail-container");
  }

  render() {
    let body = `
        <section class="detail-header">
            <h1 class="project-detail-title">${this.name}</h1>
            <button class="detail-edit material-icons">edit</button>
            <button class="detail-delete material-icons">delete</button>
        </section>
        <section class="detail-desc">
            <p>${this.desc}</p>
        </section>
    `;
    this.detailContainer.innerHTML = body;
    return this.detailContainer;
  }
}

export default ProjectDetail;
