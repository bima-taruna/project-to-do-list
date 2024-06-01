import Modal from "./modal";

class ProjectModal extends Modal {
  constructor(className, closeButtonClassName, projectName, label = "") {
    super(className, closeButtonClassName);
    this.content = `
        <form class="${projectName}">
            <label for="${label}project-name">Name : </label>
            <input type="text" id="${label}project-name" name="${label}project-name" required minlength="4" maxlength="20" required/>
            <label for="${label}project-desc">Description : </label>
            <textarea id="${label}project-desc" name="${label}project-desc" rows="5" placeholder="Enter your project desc here...."></textarea>
            <button class="${label}project-add">Add</button>
        </form>
        `;

    this.modalBody = `
            <div class="${className}">
            <button class="${closeButtonClassName} material-icons">close</button>
                ${this.content}
            </div>
        `;
    this.overlay.innerHTML = this.modalBody;
  }
}

export default ProjectModal;
