import DOMPurify from "dompurify";

class Card {
  #cardBody;
  constructor(name) {
    this.name = name;
  }

  createCardBody(className) {
    const sanitizedName = DOMPurify.sanitize(this.name);
    const bodyDiv = document.createElement("div");
    const buttonDiv = document.createElement("div");
    const deleteButton = document.createElement("button");
    const editButton = document.createElement("button");
    bodyDiv.classList.add("body-div");
    buttonDiv.classList.add("button-div");
    editButton.classList.add(className + "-edit");
    editButton.classList.add("material-icons");
    editButton.textContent = "edit";
    deleteButton.classList.add(className + "-delete");
    deleteButton.classList.add("material-icons");
    deleteButton.textContent = "delete";
    buttonDiv.appendChild(editButton);
    buttonDiv.appendChild(deleteButton);
    this.#cardBody = document.createElement("div");
    this.#cardBody.classList.add(className);
    bodyDiv.textContent = sanitizedName;
    this.#cardBody.appendChild(bodyDiv);
    this.#cardBody.appendChild(buttonDiv);
    return this.#cardBody;
  }
}

export default Card;
