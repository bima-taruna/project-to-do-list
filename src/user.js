class User {
  name = "User";
  projects = [];

  set name(newName) {
    this.name = newName;
  }

  get name() {
    return this.name;
  }
}

export const user = new User();
