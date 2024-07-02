import { th } from "date-fns/locale";

class AllTaskDOM {
  constructor() {
    this.allTask = document.createElement("div");
    this.allTask.classList.add("all-task");
  }

  get allTask() {
    return this.allTask;
  }

  render(tasks) {
    this.fetchTask(tasks);
  }

  fetchTask(tasks) {
    this.allTask.textContent = "Tasks";
    if (tasks && tasks.length > 0) {
      while (this.allTask.children.length > 0) {
        this.allTask.childNodes.forEach((item) => {
          this.allTask.removeChild(item);
        });
      }
      const taskName = tasks.map((task) => task.name);
      taskName.forEach((item) => {
        let newtaskCard = document.createElement("div");
        this.allTask.appendChild(newtaskCard);
      });
    } else {
      this.allTask.textContent = "empty..";
    }
  }
}
