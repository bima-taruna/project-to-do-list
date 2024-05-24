import DOMPurify from "dompurify";

class Card {
  constructor(name) {
    this.cardBody;
    this.name = name;
  }

  createCardBody(className) {
    const sanitizedName = DOMPurify.sanitize(this.name);
    let body = `
        <div class=${className}>
            ${sanitizedName}
        </div>
    `;
    return body;
  }
}
