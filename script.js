const musicContainer = document.getElementById('music-container');

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");
const singer = document.getElementById("singerName");
const cur = document.getElementById('currentTime');
const dur = document.getElementById("duration");

// var songs = ['summer', 'hey', 'ukulele'];
var songIndex = 0;

var songs = [
    {
        singer:'Unknown',
        title: 'Summer',
        name: 'summer',
        background:'summer'
    },
    {
        singer:'Unknown',
        title:'Hey',
        name: 'hey',
        background:'hey'
    },
    {   
        singer:'Unknown',
        title:'Ukulele',
        name: 'ukulele',
        background:'ukulele'
    }
]

loadSong(songs[songIndex]);

function loadSong(song) {
    title.innerText = song.title;
    singer.innerText = song.singer;
    cover.src = `./images/${song.background}.jpg`;
    audio.src = `./music/${song.name}.mp3`;
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
    const {
        currentTime,
        duration
    } = event.target;

    const percent = currentTime / duration * 100;
    progress.style.width = `${percent}%`;

    cur.innerHTML = `${secToMinute(Math.floor(currentTime))}/`;
    dur.innerText = secToMinute(Math.floor(duration));
}

function secToMinute(data) {
    var minutes = Math.floor(data / 60);
    var seconds = data - minutes * 60;
    return minutes.toString().padStart(2, "0") +
        ":" +
        seconds.toString().padStart(2, "0");
}

function updateProgress(event) {
    const widthX = this.clientWidth;
    const updateX = event.offsetX;
    audio.currentTime = updateX / widthX * audio.duration;
}

playBtn.addEventListener('click', () => {
    var isPlaying = musicContainer.classList.contains('play');
    (isPlaying) ? pauseSong(): playSong();
});

nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener("click", prevSong);

audio.addEventListener('timeupdate', timeUpdate);
progressContainer.addEventListener('click', updateProgress);

audio.addEventListener('ended', nextSong);