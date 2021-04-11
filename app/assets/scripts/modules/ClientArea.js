import Axios from 'axios'

class ClientArea {
    constructor() {
        this.injectHTML()
        this.form = document.querySelector('.client-area__form')
        this.field = document.querySelector('.client-area__input')
        this.contentArea = document.querySelector('.client-area__content-area')
        this.events()
    }

    events() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault()
            this.sendRequest()
        })
    }

    sendRequest() {
        Axios.post(
            'https://cocky-bohr-e281c4.netlify.app/.netlify/functions/secret-area',
            {
                password: this.field.value,
            }
        )
            .then((response) => {
                this.form.remove()
                this.contentArea.innerHTML = response.data
            })
            .catch(() => {
                this.contentArea.innerHTML = /*html*/ `
            <p class="client-area__error">That secret phrase is incorrect. Try again</p>
            `
                this.field.value = ''
                this.field.focus()
            })
    }

    injectHTML() {
        const htmlToInject = /*html*/ `
        <div class="client-area">
            <div class="wrapper wrapper--medium">
                <h2 class="section-title section-title--blue">Secret Client Area</h2>
                <form class="client-area__form" action="">
                    <input class="client-area__input" type="text" placeholder="Enter the secret phrase">
                    <button class="btn btn--orange">Submit</button>
                </form>
                <div class="client-area__content-area"></div>
            </div>
        </div>
        `
        document.body.insertAdjacentHTML('beforeend', htmlToInject)
    }
}

export default ClientArea
