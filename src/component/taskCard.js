import "../style/taskCardStyle.css";

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
                <div class="task-title">${this.title}</div>
                <p class="task-desc">${this.desc}</p>
                <div class="task-tags">
                        <div class="task-date">due date : ${this.date}</div>
                        <div class="task-priority">priority : ${this.priority}</div>
                </div>
                <div class="task-buttons">
                    <button class="material-icons task-card-edit">edit</button>
                    <button class="material-icons task-card-delete">delete</button>
                </div>
          
    `;
    this.cardBody.innerHTML = this.compactContent;

    this.cardBody.addEventListener("click", (e) => {
      if (
        e.target === e.currentTarget ||
        e.target.classList.contains("task-card-header") ||
        e.target.classList.contains("task-card-body") ||
        e.target.classList.contains("task-tags")
      ) {
        this.toogleCardContent();
      } else {
        return;
      }
    });

    return this.cardBody;
  }

  toogleCardContent() {
    if (!this.cardBody.classList.contains("extended")) {
      this.cardBody.classList.add("extended");
      this.cardBody.innerHTML = this.extendedContent;
    } else {
      this.cardBody.classList.remove("extended");
      this.cardBody.innerHTML = this.compactContent;
    }
  }
}

export default TaskCard;
