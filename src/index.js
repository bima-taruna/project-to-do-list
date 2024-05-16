import "./style.css";
import User from "./user";

if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
}

class IndexDOM {
  render() {
    this.#fetchUserName();
  }

  #fetchUserName() {
    let user = new User();
    const userName = document.querySelector(".user-name");
    userName.innerHTML = user.name;
  }
}

let indexDOM = new IndexDOM();

indexDOM.render();
