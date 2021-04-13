// import L from 'leaflet'
import '../styles/styles.css'

if (module.hot) {
    module.hot.accept()
}
// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const form = document.querySelector('.form')
const containerWorkouts = document.querySelector('.workouts')
const inputType = document.querySelector('.form__input--type')
const inputDistance = document.querySelector('.form__input--distance')
const inputDuration = document.querySelector('.form__input--duration')
const inputCadence = document.querySelector('.form__input--cadence')
const inputElevation = document.querySelector('.form__input--elevation')

// WORKOUT ARCHITECTURE
class Workout {
    date = new Date()
    id = (Date.now() + '').slice(-10)
    constructor(coords, distance, duration) {
        this.coords = coords // array of latitude and longitude
        this.distance = distance // in kms
        this.duration = duration // in minutes
    }
}

class Running extends Workout {
    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration)
        this.cadence = cadence
        this.calculatePace()
    }

    calculatePace() {
        this.pace = this.duration / this.distance
        return this.pace
    }
}
class Cycling extends Workout {
    constructor(coords, distance, duration, elevationGain) {
        super(coords, distance, duration)
        this.elevationGain = elevationGain
        this.calculateSpeed()
    }

    calculateSpeed() {
        this.speed = this.distance / (this.duration / 60)
        return this.speed
    }

}
// APPLICATION ARCHITECTURE
class App {
    #map
    #mapEvent

    constructor() {
        this._getPosition()
        form.addEventListener('submit', this._newWorkout.bind(this))
        inputType.addEventListener('change', this._toggleElevationFields)
    }

    _getPosition() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                this._loadMap.bind(this),
                function () {
                    alert('Could not get your position')
                }
            )
        }
    }

    _loadMap(position) {
        const { latitude, longitude } = position.coords
        console.log(`https://www.google.com/maps/@${latitude},${longitude}`)

        const coords = [latitude, longitude]

        this.#map = L.map('map').setView(coords, 14)

        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(this.#map)

        // Handling clicks on map
        this.#map.on('click', this._showForm.bind(this))
    }

    _showForm(mapE) {
        this.#mapEvent = mapE
        form.classList.remove('hidden')
        inputDistance.focus()

    }

    _toggleElevationFields() {
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden')
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden')

    }


    _newWorkout(e) {
        e.preventDefault()

        // Clear input fields
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value =
            ''
        //Display the marker
        const { lat, lng } = this.#mapEvent.latlng
        L.marker([lat, lng])
            .addTo(this.#map)
            .bindPopup(
                L.popup({
                    maxWidth: 250,
                    minWidth: 100,
                    autoClose: false,
                    closeOnClick: false,
                    className: 'running-popup',
                })
            )
            .setPopupContent('Workout')
            .openPopup()
    }
}

const app = new App()
