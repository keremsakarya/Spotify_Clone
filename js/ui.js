import { elements } from "./helpers.js"

//* Ekrana gönderilen müzikleri aktarır
export const renderSearchMusic = (songs) => {
    elements.list.innerHTML = ""

    songs.forEach((song) => {
        const div = document.createElement("div")

        //* Kart data sına, kart elemanına bazı verileri ekleme
        div.dataset.url = song.hub.actions.pop().uri
        div.dataset.title = song.title
        div.dataset.img = song.images.coverart
        div.className = "card"
        console.log(div)

        div.innerHTML = `
        <figure>
                        <img src="${song.images.coverart}" alt="">
                        <div class="play">
                            <i class="bi bi-play-fill" id="play-btn"></i>
                        </div>
                    </figure>
                    <h4>${song.subtitle}</h4>
                    <h4>${song.title.slice(0, 15) + "..."}</h4>
        `
        elements.list.appendChild(div)
    })
}

//* Başlığı aldığı parametreye göre günceller
export const updateTitle = (message) => {
    elements.title.innerText = message
}

//* Popüler müzikleri ekrana yazdırır
export const renderSongs = (songs) => {
    elements.list.innerHTML = ""
    songs.forEach((song) => {
        const div = document.createElement("div")

        div.dataset.url = song.preview_url
        div.dataset.title = song.name
        div.dataset.img = song.album.images[1].url
        div.className = "card"

        div.innerHTML = `
         <figure>
                        <img src="${song.album.images[1].url}" alt="">
                        <div class="play">
                            <i class="bi bi-play-fill" id="play-btn"></i>
                        </div>
                    </figure>
                    <h4>${song.album.artists[0].name}</h4>
                    <h4>${song.name.slice(0, 15) + "..."}</h4>
        `
        elements.list.appendChild(div)
    })
}

//* Playinginfo kısmına resmi ve title ı aktardık
export const renderPlayingInfo = (song) => {
    console.log(song)
    console.log(elements.playingInfo)
    elements.playingInfo.innerHTML = `
    <img src="${song.img}" alt="" class="animate" id="info-img">
            <div>
                <p>Playing now...</p>
                <h3>${song.title}</h3>
            </div>
    `
}