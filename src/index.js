import "./style.css";
import User from "./user";
import { storage } from "./storage";

if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
}

class IndexDOM {
  #user;
  constructor() {
    if (Object.keys(storage.usersData).length < 1) {
      this.#user = new User();
      storage.usersData = this.#user;
    } else {
      this.#user = storage.usersData;
    }
  }

  render() {
    this.#fetchUserName();
  }

  #fetchUserName() {
    const userName = this.#user.name;
    const userNameDOM = document.querySelector(".user-name");
    userNameDOM.innerHTML = userName;
  }
}

let indexDOM = new IndexDOM();

indexDOM.render();
