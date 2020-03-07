const musicContainer = document.getElementById('music-container');

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

var songs = ['summer', 'hey', 'ukulele'];
var songIndex = 0;

loadSong(songs[songIndex]);

function loadSong(song) {
    title.innerText = song;
    cover.src = `./images/${song}.jpg`
    audio.src = `./music/${song}.mp3`
}

function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i').classList.add('fa-play');
    playBtn.querySelector("i").classList.remove("fa-pause");
    audio.pause();
}
function playSong() {
    musicContainer.classList.add("play");
    playBtn.querySelector("i").classList.remove("fa-play");
    playBtn.querySelector("i").classList.add("fa-pause");
    audio.play();
}

function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function prevSong() {
  songIndex--;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function timeUpdate(event) {
    const { currentTime, duration } = event.target;
    const percent = currentTime / duration * 100;
    progress.style.width = `${percent}%`;
}

function updateProgress(event) {
    const widthX = this.clientWidth;
    const updateX = event.offsetX;
    audio.currentTime = updateX / widthX * audio.duration;
}

playBtn.addEventListener('click', () => {
    var isPlaying = musicContainer.classList.contains('play');
    (isPlaying) ? pauseSong() : playSong();
});

nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener("click", prevSong);

audio.addEventListener('timeupdate', timeUpdate);
progressContainer.addEventListener('click', updateProgress);

audio.addEventListener('ended', nextSong);