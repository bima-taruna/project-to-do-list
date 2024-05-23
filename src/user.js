import Project from "./project";

class User {
  name;
  projects = [];

  constructor(name) {
    this.name = name;
  }

  set name(newName) {
    this.name = newName;
  }

  get name() {
    return this.name;
  }

  get projects() {
    return this.projects;
  }

  getProjectById(index) {
    return this.projects[index];
  }

  deleteProject(index) {
    this.projects.splice(index, 1);
  }

  set projects(newProjects) {
    this.projects = newProjects;
  }

  addProject(name, description) {
    let newProject = new Project(name, description);
    this.projects.push(newProject);
  }
}

export const user = new User("User");
