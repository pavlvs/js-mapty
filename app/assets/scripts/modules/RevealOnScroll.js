import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'

class RevealOnScroll {
    constructor(items, thresholdPercent) {
        this.thresholdPercent = thresholdPercent
        this.itemsToReveal = items
        this.browserHeight = window.innerHeight
        this.hideInitially()
        this.scrollThrottle = throttle(this.calcCaller, 200).bind(this)
        this.events()
    }

    events() {
        window.addEventListener('scroll', this.scrollThrottle)
        window.addEventListener(
            'resize',
            debounce(() => {
                this.browserHeight = window.innerHeight
            }, 333)
        )
    }

    calcCaller() {
        this.itemsToReveal.forEach((item) => {
            if (!item.isRevealed) {
                this.calculateIfScrolledTo(item)
            }
        })
    }

    hideInitially() {
        this.itemsToReveal.forEach((item) => {
            item.classList.add('reveal-item')
            item.isRevealed = false
        })
        this.itemsToReveal[this.itemsToReveal.length - 1].isLastItem = true
    }

    calculateIfScrolledTo(item) {
        if (window.scrollY + this.browserHeight > item.offsetTop) {
            let scrollPercent =
                (item.getBoundingClientRect().top / this.browserHeight) * 100
            if (scrollPercent < this.thresholdPercent) {
                item.classList.add('reveal-item--is-visible')
                item.isRevealed = true
                if (item.isLastItem) {
                    window.removeEventListener('scroll', this.scrollThrottle)
                }
            }
        }
    }
}

export default RevealOnScroll
