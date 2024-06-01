import Modal from "./modal";

class ProjectModal extends Modal {
  constructor(className, closeButtonClassName, projectName) {
    super(className, closeButtonClassName);
    this.content = `
        <form class="${projectName}">
            <label for="project-name">Name : </label>
            <input type="text" id="project-name" name="project-name" required minlength="4" maxlength="20" required/>
            <label for="project-desc">Description : </label>
            <textarea id="project-desc" name="project-desc" rows="5" placeholder="Enter your project desc here...."></textarea>
            <button class="project-add">Add</button>
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
