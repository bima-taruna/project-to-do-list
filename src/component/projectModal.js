import Modal from "./modal";

class ProjectModal extends Modal {
  constructor({ className, closeButtonClassName, formName, label = "" }) {
    super(className, closeButtonClassName);
    this.formName = formName;
    this.className = className;
    this.closeButtonClassName = closeButtonClassName;
    this.label = label;
    this.render();
  }

  render() {
    this.content = `
    <form class="${this.formName}">
        <label for="${this.label}project-name">Name : </label>
        <input type="text" id="${this.label}project-name" name="${this.label}project-name" required minlength="4" maxlength="20" required/>
        <label for="${this.label}project-desc">Description : </label>
        <textarea id="${this.label}project-desc" name="${this.label}project-desc" rows="5" placeholder="Enter your project desc here...."></textarea>
        <button class="${this.label}project-add"></button>
    </form>
    `;

    this.modalBody = `
        <div class="${this.className}">
        <button class="${this.closeButtonClassName} material-icons">close</button>
            ${this.content}
        </div>
    `;
    this.overlay.innerHTML = this.modalBody;
  }

  changeButtonText(newText) {
    const buttonElement = this.overlay.querySelector(
      `.${this.label}project-add`
    );
    if (buttonElement) {
      buttonElement.textContent = newText;
    }
  }
}

export default ProjectModal;
