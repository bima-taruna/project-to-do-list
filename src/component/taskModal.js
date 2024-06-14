import Modal from "./modal";

class TaskModal extends Modal {
  checked = false;
  constructor() {
    this.content = `
            <form class="task-form">
                <label for="task-name">Name : </label>
                <input type="text" id="task-name" name="task-name" required minlength="4" maxlength="20" required/>
                <label for="task-desc">Description : </label>
                <textarea id="task-desc" name="task-desc" rows="5" placeholder="Enter your project desc here...."></textarea>
                <button class="task-add"></button>
            </form>
        `;
    this.modalBody = `
            <div class="task-modal">
                <button class="material-icons btn-taskform-close"></button>
                ${this.content}
            </div>
        `;
    this.overlay.innerHTML = this.modalBody;
  }

  changeButtonText(newText) {
    const buttonElement = this.overlay.querySelector(".task-add");
    if (buttonElement) {
      buttonElement.textContent = newText;
    }
  }
}
