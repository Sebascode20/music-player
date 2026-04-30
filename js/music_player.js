const d = document,
  $startMusicTempo = d.getElementById("startMusicTempo"),
  $endMusicTempo = d.getElementById("endMusicTempo"),
  $playBtn = d.getElementById("playButton"),
  $musicCover = d.querySelector(".card__musical-cover"),
  $musicTitle = d.querySelector(".card__music-title"),
  $musicAuthor = d.querySelector(".card__music-author"),
  $progressBar = d.getElementById("progressBar");

const songs = [
  {
    title: "Lost in the City Lights",
    author: "Cosmo Sheldrake",
    src: "../resources/lost-in-city-lights-145038.mp3",
    image: "../resources/cover-1.jpg",
  },
  {
    title: "Forest Lullaby",
    author: "Lesfm",
    src: "../resources/forest-lullaby-110624.mp3",
    image: "../resources/cover-2.jpg",
  },
  {
    title: "The Fate Of Ophelia",
    author: "Taylor Swift",
    src: "../resources/Taylor Swift-The Fate of Ophelia.mp3",
    image: "../resources/cover-3.jpg",
  },
];

let currentSongIndex = 0;
const audio = new Audio(songs[currentSongIndex].src);

d.getElementById("playButton").addEventListener("click", playPause);
d.getElementById("nextButton").addEventListener("click", nextSong);
d.getElementById("prevButton").addEventListener("click", prevSong);
let audioProgressBar = audio.addEventListener("timeupdate", updateProgressBar);

function playPause() {
  if (audio.paused) {
    audio.play();
    $playBtn.setAttribute("src", "./resources/Pause_fill.svg");
  } else {
    audio.pause();
    $playBtn.setAttribute("src", "./resources/Play_fill.svg");
  }
}

function nextSong() {
  if (currentSongIndex < songs.length - 1) currentSongIndex += 1;
  else currentSongIndex = 0;

  loadSong(currentSongIndex);
  playPause();
}

function prevSong() {
  if (currentSongIndex > 0) currentSongIndex -= 1;
  else currentSongIndex = songs.length - 1;

  loadSong(currentSongIndex);
  playPause();
}

function loadSong(currentSongIndex) {
  const { title, author, src, image } = songs[currentSongIndex];
  $musicTitle.textContent = title;
  $musicAuthor.textContent = author;
  $musicCover.src = `./resources/${image}`;
  audio.src = `./resources/${src}`;
  audio.load();

  audio.addEventListener("loadedmetadata", () => {
    let minutes = Math.floor(audio.duration / 60);
    let seconds = Math.floor(audio.duration % 60);
    let musicTempo = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    $endMusicTempo.textContent = musicTempo;
  });
}

function updateProgressBar() {
  const { duration, currentTime } = audio;
  const progressPercent = (currentTime / duration) * 100 || 0;

  $progressBar.value = progressPercent;

  $progressBar.style.background = `linear-gradient(to right, #C93B76 ${progressPercent}%, #E5E7EB33 ${progressPercent}%)`;
}

document.getElementById("progressBar").addEventListener("input", () => {
  audio.currentTime = ($progressBar.value / 100) * audio.duration;
  updateProgressBar();
});

loadSong(currentSongIndex);
