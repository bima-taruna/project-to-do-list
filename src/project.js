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

  updateTask(id, title, desc, date, priority) {
    const targetTask = this.getTaskById(id);
    targetTask.title = title;
    targetTask.desc = desc;
    targetTask.date = date;
    targetTask.priority = priority;
    user.randomTask.forEach((task2) => {
      if (targetTask.id === task2.id) {
        task2.title = title;
        task2.desc = desc;
        task2.date = date;
        task2.priority = priority;
      }
    });
  }

  updateTaskStatus(id, status) {
    const targetTask = this.getTaskById(id);
    targetTask.isFinish = status;
    user.randomTask.forEach((task2) => {
      if (targetTask.id === task2.id) {
        task2.isFinish = status;
      }
    });
  }

  getTaskById(id) {
    return this.task.find((task) => task.id === id);
  }
}

export default Project;
