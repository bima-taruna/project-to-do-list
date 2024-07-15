import Project from "./project";
import Task from "./task";

class User {
  constructor(name) {
    this.name = name;
    this.projects = [];
    this.task = [];
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
    this.task.push(newTask);
    console.log("success");
  }

  updateTask(index, title, desc, date, priority) {
    this.task[index].title = title;
    this.task[index].desc = desc;
    this.task[index].date = date;
    this.task[index].priority = priority;
  }
}

export const user = new User("User");
