const musicContainer = document.querySelector('#music-container');

const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");

const audio = document.querySelector("#audio");
const progress = document.querySelector("#progress");
const progressContainer = document.querySelector("#progress-container");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");

//Song titles
const songs = ['hey', 'summer', 'ukulele'];
//Keep track of songs
let songIndex = 1;
//Initially load song details into DOM 
loadSong(songs[songIndex]);
//Update song details
function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`
}

//PlaySong
function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector("i.fas").classList.add("fa-pause");

    audio.play();
}
//Pause Song
function pauseSong() {
    musicContainer.classList.remove("play");
    playBtn.querySelector("i.fas").classList.add("fa-play");
    playBtn.querySelector("i.fas").classList.remove("fa-pause");

    audio.pause();
}

//Pre song 
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

//Next Song 
function prevSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
      songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}
// Event Listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
})

//Change Song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener("click", nextSong);