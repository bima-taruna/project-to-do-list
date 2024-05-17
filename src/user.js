import { storage } from "./storage";

class User {
  #name = "User";

  set name(newName) {
    storage.nameData = newName;
    this.#name = storage.nameData;
  }

  get name() {
    return this.#name;
  }
}

export default User;
