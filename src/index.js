import "./style.css";
import { user } from "./user";
import { storage } from "./storage";
import Modal from "./component/modal";

if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
}

class IndexDOM {
  #main;
  #editNameBtn;

  constructor() {
    storage.usersData = user;
    this.#main = document.querySelector("main");
    this.#editNameBtn = document.getElementById("btn-edit-name");
  }

  render() {
    this.#fetchUserName();
    this.showNameInput();
  }

  #fetchUserName() {
    const userName = storage.usersData.name;
    const userNameDOM = document.querySelector(".user-name");
    userNameDOM.innerHTML = userName;
  }

  showNameInput() {
    let input = `
      <label for="user-name">Name : </label>
      <input type="text" id="user-name" name="user-name" required minlength="4" maxlength="8" />
    `;
    let nameModal = new Modal(input);
    this.#main.appendChild(nameModal.overlay);
  }
}

let indexDOM = new IndexDOM();

indexDOM.render();
