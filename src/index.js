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
  #projectModal;

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
    this.#appendProjectDataInput();
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
      <input type="text" id="user-name" name="user-name" required minlength="4" maxlength="10" required/>
      <button class="btn-name-change">Change</button>
    </div>
    `;
    this.#nameModal = new Modal(input, "name-modal");
    this.#main.appendChild(this.#nameModal.overlay);
  }

  #appendProjectDataInput() {
    let form = `
      <form class="project-input">
        <label for="project-name">Name : </label>
        <input type="text" id="project-name" name="project-name" required minlength="4" maxlength="50" required/>
        <label for="project-desc">Description : </label>
        <textarea id="story" name="story" rows="5" cols="33" />
        <button class="project-add">Add</button>
      </form>
    `;
    this.#projectModal = new Modal(form, "project-modal");
    this.#main.appendChild(this.#projectModal.overlay);
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
