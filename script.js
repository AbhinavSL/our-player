const songs = [

{
    name:"I Wanna Be Yours",
    artist:"Arctic Monkeys",
    file:"songs/song1.mp3",
    cover:"images/1.jpg"
},

{
    name:"Unnai Kaanadhu Naan",
    artist:"Shankar–Ehsaan–Loy",
    file:"songs/song2.mp3",
    cover:"images/2.jpg"
},

{
    name:"Kaattuchembakam",
    artist:"Jakes Bejoy",
    file:"songs/song3.mp3",
    cover:"images/3.jpg"
},

{
    name:"Say Yes To Heaven",
    artist:"Lana Del Rey",
    file:"songs/song4.mp3",
    cover:"images/4.jpg"
}
];

let currentSong = 0;
const song = document.getElementById("song");
const voice = document.getElementById("voice");

const playBtn = document.getElementById("playBtn");

const progress = document.getElementById("progress");

const current = document.getElementById("current");
const duration = document.getElementById("duration");

const cover = document.getElementById("cover");

const voiceBtn = document.getElementById("voiceBtn");

const songName = document.getElementById("songName");

const artistName = document.getElementById("artistName");

const prevBtn = document.getElementById("prevBtn");

const nextBtn = document.getElementById("nextBtn");

function loadSong(index){

    song.src = songs[index].file;

    cover.src = songs[index].cover;

    songName.innerHTML =
    songs[index].name;

    artistName.innerHTML =
    songs[index].artist;
}

loadSong(currentSong);

let playing = false;

playBtn.addEventListener("click", () => {

    if(!playing){

        voice.pause();

        voice.currentTime = 0;

        voiceBtn.innerHTML = "PLAY VOICE NOTE";

        voicePlaying = false;

        song.play();

        playBtn.innerHTML = "❚❚";

        cover.classList.add("rotate");
        cover.classList.remove("paused");

        playing = true;

    } else {

        song.pause();

        playBtn.innerHTML = "▶";

        cover.classList.add("paused");

        playing = false;
    }
});

const progressBar =
document.getElementById("progressBar");

const thumb =
document.getElementById("thumb");

song.addEventListener("timeupdate", () => {

    const percent =
    (song.currentTime / song.duration) * 100;

    progress.style.width = percent + "%";

    thumb.style.left = percent + "%";

    current.innerHTML =
    formatTime(song.currentTime);

    duration.innerHTML =
    formatTime(song.duration);

});

progressBar.addEventListener("click", (e)=>{

    const width = progressBar.clientWidth;

    const clickX = e.offsetX;

    const duration = song.duration;

    song.currentTime =
    (clickX / width) * duration;

});

let isDragging = false;

thumb.addEventListener("mousedown", ()=>{

    isDragging = true;

});

document.addEventListener("mouseup", ()=>{

    isDragging = false;

});

document.addEventListener("mousemove", (e)=>{

    if(!isDragging) return;

    const rect =
    progressBar.getBoundingClientRect();

    let x = e.clientX - rect.left;

    if(x < 0) x = 0;

    if(x > rect.width) x = rect.width;

    const percent = x / rect.width;

    progress.style.width =
    percent * 100 + "%";

    thumb.style.left =
    percent * 100 + "%";

    song.currentTime =
    percent * song.duration;

});

thumb.addEventListener("touchstart", ()=>{

    isDragging = true;

});

document.addEventListener("touchend", ()=>{

    isDragging = false;

});

document.addEventListener("touchmove", (e)=>{

    if(!isDragging) return;

    const rect =
    progressBar.getBoundingClientRect();

    let x =
    e.touches[0].clientX - rect.left;

    if(x < 0) x = 0;

    if(x > rect.width) x = rect.width;

    const percent = x / rect.width;

    progress.style.width =
    percent * 100 + "%";

    thumb.style.left =
    percent * 100 + "%";

    song.currentTime =
    percent * song.duration;

});

function formatTime(time){

    let mins = Math.floor(time / 60);

    let secs = Math.floor(time % 60);

    if(secs < 10){
        secs = "0" + secs;
    }

    return mins + ":" + secs;
}

let voicePlaying = false;

voiceBtn.addEventListener("click", () => {

    if(!voicePlaying){

        song.pause();

        playBtn.innerHTML = "▶";

        playing = false;

        cover.classList.add("paused");

        voice.play();

        voiceBtn.innerHTML = "PAUSE VOICE NOTE";

        voicePlaying = true;

    } else {

        voice.pause();

        voiceBtn.innerHTML = "PLAY VOICE NOTE";

        voicePlaying = false;
    }

});

nextBtn.addEventListener("click", ()=>{

    currentSong++;

    if(currentSong >= songs.length){
        currentSong = 0;
    }

    loadSong(currentSong);

    song.play();

    playBtn.innerHTML = "❚❚";

    playing = true;

    cover.classList.remove("rotate");

    setTimeout(()=>{

        cover.classList.add("rotate");

    },10);
});

song.addEventListener("ended", ()=>{

    currentSong++;

    if(currentSong >= songs.length){
        currentSong = 0;
    }

    loadSong(currentSong);
    cover.classList.add("rotate");
    cover.classList.add("paused");

    song.play();

    playBtn.innerHTML = "❚❚";

    playing = true;

});

prevBtn.addEventListener("click", ()=>{

    currentSong--;

    if(currentSong < 0){
        currentSong = songs.length - 1;
    }

    loadSong(currentSong);
    cover.classList.add("rotate");
    cover.classList.add("paused");

    song.play();

    playBtn.innerHTML = "❚❚";

    playing = true;
});