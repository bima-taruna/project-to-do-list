import Task from "./task";
import { user } from "./user";

class Project {
  constructor(name, description) {
    this.name = name;
    this.description = description;
    this.task = [];
  }

  addTask(title, desc, date, priority) {
    const newTask = new Task(title, desc, date, priority);
    this.task.push(newTask);
    user.task.push(newTask);
  }

  deleteTask(index) {
    // user.task.forEach((item, i) => {
    //   if (item === this.task[index]) {
    //     user.task.splice(i, 1);
    //   }
    // });
    this.task.splice(index, 1);
  }

  updateTask(index, title, desc, date, priority) {
    this.task[index].title = title;
    this.task[index].desc = desc;
    this.task[index].date = date;
    this.task[index].priority = priority;
  }
}

export default Project;
