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
    user.projects[index].task.forEach((item) => {
      user.randomTask = user.randomTask.filter((item2) => item2.id !== item.id);
    });
    this.projects.splice(index, 1);
    storage.usersData = user;
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
  }

  deleteTask(index) {
    this.projects.forEach((project) => {
      project.task = project.task.filter(
        (item) => item.id !== this.randomTask[index].id
      );
    });
    this.randomTask.splice(index, 1);
  }

  updateTask(id, title, desc, date, priority) {
    const targetTask = this.getTaskById(id);
    targetTask.title = title;
    targetTask.desc = desc;
    targetTask.date = date;
    targetTask.priority = priority;
    this.projects.forEach((project) => {
      project.task.forEach((task) => {
        if (task.id === targetTask.id) {
          task.title = title;
          task.desc = desc;
          task.date = date;
          task.priority = priority;
        }
      });
    });
  }

  updateTaskStatus(id, status) {
    const targetTask = this.getTaskById(id);
    targetTask.isFinish = status;
    this.projects.forEach((project) => {
      project.task.forEach((task) => {
        if (task.id === targetTask.id) {
          task.isFinish = status;
        }
      });
    });
  }

  getTaskById(id) {
    return this.randomTask.find((task) => task.id === id);
  }
}

export const user = new User("User");
