import Task from "./task";

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

  addTask(title, desc, date) {
    const newTask = new Task(title, desc, date);
    this.task.push(newTask);
  }
}

export default Project;
