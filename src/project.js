import indexDOM from ".";
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
    const project = user.projects[indexDOM.projectDetail.index];
    user.randomTask = user.randomTask.filter(
      (item) => item.id !== project.task[index].id
    );
    project.task.splice(index, 1);
  }

  updateTask(index, title, desc, date, priority) {
    this.task[index].title = title;
    this.task[index].desc = desc;
    this.task[index].date = date;
    this.task[index].priority = priority;
    user.randomTask.forEach((task2) => {
      if (this.task[index].id === task2.id) {
        task2.title = title;
        task2.desc = desc;
        task2.date = date;
        task2.priority = priority;
      }
    });
  }
}

export default Project;
