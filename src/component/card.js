import DOMPurify from "dompurify";

class Card {
  #cardBody;
  constructor(name) {
    this.name = name;
  }

  createCardBody(className) {
    const sanitizedName = DOMPurify.sanitize(this.name);
    this.#cardBody = document.createElement("div");
    this.#cardBody.classList.add(className);
    this.#cardBody.textContent = sanitizedName;
    return this.#cardBody;
  }
}

export default Card;
