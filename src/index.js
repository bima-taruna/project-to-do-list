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
  #nameModal;
  #userNameInput;

  constructor() {
    if (!storage.usersData) {
      storage.usersData = user;
    } else {
      user.name = storage.usersData.name;
    }
    this.#main = document.querySelector("main");
    this.#editNameBtn = document.getElementById("btn-edit-name");
  }

  render() {
    console.log(user);
    console.log(storage.usersData);
    this.#fetchUserName();
    this.#appendUserNameInput();
    let closeModalButton = document.querySelector(".btn-close");
    let changeUserNameButton = document.querySelector(".btn-name-change");
    this.#userNameInput = document.getElementById("user-name");
    this.#editNameBtn.addEventListener("click", () =>
      this.#nameModal.openModal()
    );
    closeModalButton.addEventListener("click", () =>
      this.#nameModal.closeModal()
    );

    changeUserNameButton.addEventListener("click", () => {
      this.changeUserName();
    });
  }

  #fetchUserName() {
    const userName = storage.usersData.name;
    const userNameDOM = document.querySelector(".user-name");
    userNameDOM.innerHTML = userName;
  }

  #appendUserNameInput() {
    let input = `
    <div class="name-input">
      <label for="user-name">Name : </label>
      <input type="text" id="user-name" name="user-name" required minlength="4" maxlength="10" />
      <button class="btn-name-change">Change</button>
    </div>
    `;
    this.#nameModal = new Modal(input, "name-modal");
    this.#main.appendChild(this.#nameModal.overlay);
  }

  changeUserName() {
    user.name = this.#userNameInput.value;
    storage.usersData = user;
    this.#fetchUserName();
    this.#nameModal.closeModal();
  }
}

let indexDOM = new IndexDOM();

indexDOM.render();
