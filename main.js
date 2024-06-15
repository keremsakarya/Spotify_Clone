import { API } from "./js/api.js";
import { elements } from "./js/helpers.js";
import { renderPlayingInfo, updateTitle } from "./js/ui.js";

const api = new API()

//* Form gönderildiği anda API ye istek at ve cevabı ekrana yazdır
elements.form.addEventListener("submit", (e) => {
    e.preventDefault() // Form gönderildiğinde sayfanın yenilenmesini engeller
    const query = e.target[0].value // İnputun içerisindeki değere ulaştık

    //* Input a girilen değer boş ise burada durdur
    if (!query) {
        alert("Please fill the search side with a music name")
        return
    }


    updateTitle(`Results for " ${query} "`)
    api.searchMusic(query)
})

//* Sayfa yüklendiği anda API ye istek atıp popüler müzikleri ekrana getir
document.addEventListener("DOMContentLoaded", async () => await api.topPopular())


const playMusic = (url) => {
    //* Müziğin url ini html e aktarma
    elements.audioSource.src = url
    //* audio elementine müziğim yüklenmesini sağladık
    elements.audio.load()
    //* audio elementinin yüklenemsini sağladık
    elements.audio.play()
}

//* Listede tıklamalarda çalışır
const handleClick = (e) => {
    if (e.target.id === "play-btn") {
        const parent = e.target.parentElement.parentElement.parentElement
        renderPlayingInfo(parent.dataset)
        playMusic(parent.dataset.url) // Müziği çalar
    }
}

//* Liste alanındaki tıklamaları izler
document.addEventListener("click", handleClick)

//* Fotoğrafı döndürür
const animatePhoto = () => {
    const img = document.querySelector(".info img")
    img.className = "animate"
}

//* Fotoğrafın dönmesini durdurur
const stopAnimation = () => {
    const img = document.querySelector(".info img")
    img.classList.remove = ("animate")
}

//* Müziği çalma ve durdurma olaylarını izler
elements.audio.addEventListener("play", animatePhoto)
elements.audio.addEventListener("pause", stopAnimation)