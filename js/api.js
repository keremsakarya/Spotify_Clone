import { renderSearchMusic, renderSongs } from "./ui.js";

//* Input a girilen veriye göre aratacağımız API key
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '3fe30a3be8mshdb46b05a133f93dp190a8ajsn63a5684de21d',
        'x-rapidapi-host': 'shazam.p.rapidapi.com'
    }
};

//* Popüler müzikleri getireceğimiz API key
const optionsTop = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '3fe30a3be8mshdb46b05a133f93dp190a8ajsn63a5684de21d',
        'x-rapidapi-host': 'spotify23.p.rapidapi.com'
    }
};


export class API {
    constructor() {
        this.songs = []
    }

    //* Input a girilen veriye göre API den cevabı getirir
    async searchMusic(query) {
        try {
            const res = await fetch(`https://shazam.p.rapidapi.com/search?term=${query}=&locale=en-US&limit=5`, options)
            const data = await res.json()

            let newData = data.tracks.hits
            newData = newData.map((song) => ({ ...song.track }))
            this.songs = newData

            //* Ekrana API den gelen her bir şarkıyı yazdıracağımız yöntem
            renderSearchMusic(this.songs)
        } catch (err) {
            console.log(err)
        }
    }

    async topPopular() {
        const url = 'https://spotify23.p.rapidapi.com/recommendations/?limit=20&seed_tracks=0c6xIDDpzE81m2q797ordA&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2Ccountry';
        try {

            const response = await fetch(url, optionsTop) // API ye fetch isteği at
            const result = await response.json() // Veriyi json formatına çevir
            this.songs = result.tracks // Tanımladığımız songs dizisine gelen cevabı aktar

            renderSongs(this.songs)
        } catch (error) {
            console.log(error)
        }
    }
}