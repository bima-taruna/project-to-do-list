import DOMPurify from "dompurify";

class Modal {
  modalBody;
  #overlay;

  constructor(content, className, closeButtonClassName) {
    const sanitizedContent = DOMPurify.sanitize(content);
    this.#overlay = document.createElement("div");
    this.#overlay.classList.add("overlay");
    this.modalBody = ` 
        <div class="${className}">
            <button class="${closeButtonClassName} material-icons">close</button>
                ${sanitizedContent}
        </div>
            `;
    this.#overlay.innerHTML = this.modalBody;
  }

  get modalBody() {
    return this.modalBody;
  }

  get overlay() {
    return this.#overlay;
  }

  openModal() {
    this.#overlay.style.display = "block";
  }

  closeModal() {
    this.#overlay.style.display = "none";
  }
}

export default Modal;
