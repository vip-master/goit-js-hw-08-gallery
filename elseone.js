import data from './gallery-items.js'

const list = document.querySelector(".js-gallery")

const modal = document.querySelector(".js-lightbox")
const modalImg = modal.querySelector("img.lightbox__image")
let indexImg

data.forEach((el) => list.insertAdjacentHTML("beforeend", `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${el.original}"
  >
    <img
      class="gallery__image"
      src="${el.preview}"
      data-source="${el.original}"
      alt="${el.description}"
    />
  </a>
</li>`))

const setImage = (index) => {
    modalImg.src = data[index].original
    modalImg.alt = data[index].description

}

const openModal = (event) => {
    data.forEach((e, i) => { if (event.target.dataset.source == e.original) indexImg = i })
    setImage(indexImg)
    modal.classList.add("is-open")
}


const closeModal = () => {
    modalImg.src = ""
    modalImg.alt = ""

    modal.classList.remove("is-open")

}

const checker = (e) => {
    if (e.target.classList.contains("gallery__image")) return openModal(e)

}

const keyHandler = (e) => {
    if (!modal.classList.contains("is-open")) return
    switch (e.key) {
        case "Escape":
            closeModal()
            break
        case "ArrowRight":
            indexImg++
            if (indexImg >= data.length) indexImg = 0
            setImage(indexImg)
            break
        case "ArrowLeft":
            indexImg--
            if (indexImg < 0) indexImg = data.length - 1
            setImage(indexImg)
            break
    }
}

document.querySelector(".js-gallery").addEventListener("click", checker)
document.querySelector(".lightbox__overlay").addEventListener("click", closeModal)
document.querySelector(`button[data-action="close-lightbox"]`).addEventListener("click", closeModal)
window.addEventListener("keydown", _.throttle(keyHandler, 100))
document.querySelectorAll(`.gallery__link`).forEach((e) => e.addEventListener("click", (e) => e.preventDefault()))