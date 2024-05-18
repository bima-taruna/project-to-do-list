// function modal(content) {
//   let modalBody = `
//   <div class="overlay">
//     <div class="modal">
//         <button class="btn-close">close</button>
//         ${content}
//     </div>
//     </div>
//     `;
//   let modalTrigger = false;

//   let overlay = document.querySelector(".overlay");
//   let closeButton = document.querySelector(".btn-close");

//   closeButton.addEventListener("click", () => {
//     modalTrigger = false;
//     toogleModal();
//   });

//   function toogleModal() {
//     if (modalTrigger) {
//       overlay.style.display = "block";
//     } else {
//       overlay.style.display = "none";
//     }
//   }
// }

// export default modal;

class Modal {
  modalBody;
  #overlay;

  constructor(content, className) {
    this.#overlay = document.createElement("div");
    this.#overlay.classList.add("overlay");
    this.modalBody = ` 
        <div class="${className}">
            <button class="btn-close">close</button>
                ${content}
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
