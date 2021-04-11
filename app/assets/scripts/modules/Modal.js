class Modal {
    constructor() {
        this.injectHTML()
        this.closeIcon = document.querySelector('.modal__close')
        this.modal = document.querySelector('.modal')
        this.events()
    }

    events() {
        // listen close modal button click
        this.closeIcon.addEventListener('click', () => this.closeModal())

        // listen for escape key press
        document.addEventListener('keyup', (e) => {
            if (e.key === 'Escape') {
                this.closeModal()
            }
        })
    }

    injectHTML() {
        const modalHTML = /*html*/ `
            <div class="modal">
                <div class="modal__inner">
                <h2 class="section-title section-title--blue section-title--less-margin"><img src="assets/images/icons/mail.svg"
                    class="section-title__icon"> Get in <strong>Touch</strong></h2>
                <div class="wrapper wrapper--narrow">
                    <p class="modal__description">We will have an online order system in place soon. Until then, connect with us on
                    any of the platforms below!</p>
                </div>

                <div class="social-icons">
                    <a href="#" class="social-icons__icon"><img src="assets/images/icons/facebook.svg" alt="Facebook"></a>
                    <a href="#" class="social-icons__icon"><img src="assets/images/icons/twitter.svg" alt="Twitter"></a>
                    <a href="#" class="social-icons__icon"><img src="assets/images/icons/instagram.svg" alt="Instagram"></a>
                    <a href="#" class="social-icons__icon"><img src="assets/images/icons/youtube.svg" alt="YouTube"></a>
                </div>
                </div>
                <div class="modal__close">X</div>
            </div>`
        document.body.insertAdjacentHTML('beforeend', modalHTML)
    }

    openModal() {
        this.modal.classList.add('modal--is-visible')
    }

    closeModal() {
        this.modal.classList.remove('modal--is-visible')
    }
}

export default Modal
