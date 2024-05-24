import DOMPurify from "dompurify";

class Card {
  #cardBody;
  constructor(name) {
    this.name = name;
  }

  createCardBody(className) {
    const sanitizedName = DOMPurify.sanitize(this.name);
    this.#cardBody = `
        <div class=${className}>
            ${sanitizedName}
        </div>
    `;
    return this.#cardBody;
  }
}

export default Card;
