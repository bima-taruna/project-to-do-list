import { th } from "date-fns/locale";

class AllTaskDOM {
  constructor() {
    this.allTask = document.createElement("div");
    this.allTask.classList.add("all-task");
  }

  get allTask() {
    return this.allTask;
  }
}
