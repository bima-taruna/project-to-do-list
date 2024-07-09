class TaskCard {
  cardBody;
  constructor(title, desc, date, priority, isFinish = "false") {
    this.title = title;
    this.desc = desc;
    this.date = date;
    this.priority = priority;
    this.isFinish = isFinish;
    this.cardBody = document.createElement("div");
    this.cardBody.classList.add("task-card");
    this.compactContent = `
            <section class="task-card-header">
                <div class="task-title">${this.title}</div>
                <div class="task-buttons">
                    <button class="material-icons task-edit">edit</button>
                    <button class="material-icons task-delete">delete</button>
                </div>
            </section>
        `;
    this.extendedContent = `
            <section class="task-card-header">
                <div class="task-title">${this.title}</div>
                <button class="material-icons task-delete">delete</button>
            </section>
            <section class="task-card-body">
                <div class="task-desc">${this.desc}</div>
            </section>
            <section class="task-card-footer">
                <div class="task-tags">
                        <div class="task-date">due date : ${this.date}</div>
                        <div class="task-priority">priority : ${this.priority}</div>
                <div>
                <div class="task-card-buttons">
                    <button class="material-icons task-card-edit">edit</button>
                    <button class="material-icons task-card-delete">delete</button>
                </div>
            </section>
    `;
    this.cardBody.innerHTML = this.compactContent;
  }
}
