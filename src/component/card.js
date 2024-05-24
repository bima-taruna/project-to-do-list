import DOMPurify from "dompurify";

class Card {
  #cardBody;
  constructor(name) {
    this.name = name;
  }

  createCardBody(className) {
    const sanitizedName = DOMPurify.sanitize(this.name);
    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("button-div");
    const deleteButton = document.createElement("button");
    const editButton = document.createElement("button");
    editButton.classList.add(className + "-edit");
    editButton.classList.add("material-icons");
    editButton.textContent = "edit";
    deleteButton.classList.add(className + "-delete");
    deleteButton.classList.add("material-icons");
    deleteButton.textContent = "delete";
    buttonDiv.appendChild(deleteButton);
    buttonDiv.appendChild(editButton);
    this.#cardBody = document.createElement("div");
    this.#cardBody.classList.add(className);
    this.#cardBody.textContent = sanitizedName;
    this.#cardBody.appendChild(buttonDiv);
    return this.#cardBody;
  }
}

export default Card;
