import Storage from "./storage";

class User {
  #name = "User";

  set name(newName) {
    this.#name = newName;
  }

  get name() {
    return this.#name;
  }
}

export default User;
