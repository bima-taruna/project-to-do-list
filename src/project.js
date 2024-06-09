class Project {
  name;
  description;
  task = [];

  constructor(name, description) {
    this.name = name;
    this.description = description;
  }

  get name() {
    return this.name;
  }

  set name(newName) {
    this.name = newName;
  }

  get description() {
    return this.description;
  }

  set description(newDesc) {
    this.description = newDesc;
  }
}

export default Project;
