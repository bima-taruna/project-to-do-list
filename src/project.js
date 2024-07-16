import { storage } from "./storage";
import Task from "./task";
import { user } from "./user";

class Project {
  constructor(name, description, task = []) {
    this.name = name;
    this.description = description;
    this.task = task;
  }

  addTask(title, desc, date, priority) {
    const newTask = new Task(title, desc, date, priority);
    this.task.push(newTask);
    user.randomTask.push(newTask);
    storage.usersData = user;
  }

  deleteTask(index) {
    user.task.forEach((item, i) => {
      if (item.id === this.task[index].id) {
        user.task.splice(i, 1);
      }
    });
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
