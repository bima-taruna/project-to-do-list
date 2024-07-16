import Project from "./project";
import { storage } from "./storage";
import Task from "./task";

class User {
  constructor(name) {
    this.name = name;
    this.projects = [];
    this.randomTask = [];
  }

  getProjectById(index) {
    return this.projects[index];
  }

  deleteProject(index) {
    this.projects.splice(index, 1);
  }

  addProject(name, description) {
    let newProject = new Project(name, description);
    this.projects.push(newProject);
  }

  updateProject(index, name, desc) {
    this.projects[index].name = name;
    this.projects[index].description = desc;
  }

  addTask(title, desc, date, priority) {
    const newTask = new Task(title, desc, date, priority);
    this.randomTask.push(newTask);
    storage.usersData = user;
    console.log("success");
  }

  updateTask(index, title, desc, date, priority) {
    this.randomTask[index].title = title;
    this.randomTask[index].desc = desc;
    this.randomTask[index].date = date;
    this.randomTask[index].priority = priority;
  }
}

export const user = new User("User");
