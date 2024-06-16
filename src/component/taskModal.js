import Modal from "./modal";

class TaskModal extends Modal {
  checked = false;
  constructor() {
    super();
    this.render();
  }

  render() {
    this.content = `
            <form class="task-form">
                <label for="task-name">Name : </label>
                <input type="text" id="task-name" name="task-name" required minlength="4" maxlength="20" required/>
                <label for="task-desc">Description : </label>
                <textarea id="task-desc" name="task-desc" rows="5" placeholder="Enter your project desc here...."></textarea>
                <label for="task-date">Due Date : </label>
                <input type="date" id="task-date" name="task-date"/>
                <label for="task-priority">Priority : </label>
                <select name="task-priority" id="task-priority">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <button class="task-add"></button>
            </form>
        `;
    this.modalBody = `
            <div class="task-modal">
                <button class="material-icons btn-taskform-close">close</button>
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

export default TaskModal;
