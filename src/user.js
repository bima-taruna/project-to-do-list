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
}

export const user = new User("User");
