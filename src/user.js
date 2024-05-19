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

  addProject(name, description) {
    let newProject;
  }
}

export const user = new User("User");
