
let songList=[
  {
      name: "We Will Rock You",
      artist:"5ive",
      cover: "F:/Webd/MusicPlayer/img/cover1.jpg",
      path:"F:/Webd/MusicPlayer/songs/We will Rock You.mp3"
  },
  {
      name:"See u again",
      artist:"Wiz",
      cover:"F:/Webd/MusicPlayer/img/cover2.jpg",
      path:"F:/Webd/MusicPlayer/songs/s1.mp3"
  },
  {
      name:"Agar Tum Sath Ho",
      artist:"Shreya Goshal",
      cover:"F:/Webd/MusicPlayer/img/cover3.jpg",
      path:"F:/Webd/MusicPlayer/songs/Agar Tum Sath Ho.mp3"
  }
];


// Select all the elements in the HTML page and assign them to a variable
var songName = document.querySelector("#song_name");
var artistName = document.querySelector("#artist_name");
var playPause = document.querySelector("#playbt");
var previous = document.querySelector("#backwardbt");
var next = document.querySelector("#forwardbt");


var playSlider = document.querySelector("#playbar");
var volumeSlider = document.querySelector("#volume");
var currTime = document.querySelector("#Current_time");
var totalDuration = document.querySelector("#Total_duration");

// Specify globally used values
let songIndex = 0;
let isPlaying = false;
let updateTimer;

// Create the audio element for the player
var currSong = document.createElement('audio');



function loadSong(songIndex) {

  clearInterval(updateTimer);
  resetValues();

  // Load a new song
  currSong.src = songList[songIndex].path;
  currSong.load()

  // Update details of the song
  songName.textContent = songList[songIndex].name;
  artistName.textContent = songList[songIndex].artist;

  // Set an interval of 1000 milliseconds for updating the seek slider
  updateTimer = setInterval(sliderUpdate, 1000);

  //Move to the next song if the current finishes playing using the 'ended' event
  currSong.addEventListener("ended", nextSong)

}

function resetValues() {
  currTime.textContent = "00:00";
  totalDuration.textContent = "00:00";
  playSlider.value = 0;
}




function playOrPause() {
  // Switch between playing and pausing depending on the current state
  if (!isPlaying) playSong();
  else pauseSong();
}
  
function playSong() {
  // Play the loaded song
  currSong.play();
  isPlaying = true;
  
  // Replace icon with the pause icon
  //playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
  
function pauseSong() {
  // Pause the loaded song
  currSong.pause();
  isPlaying = false;
  
  // Replace icon with the play icon
  //playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
  
function nextSong() {
  // Go back to the first song if the current one is the last in the song list
  if (songIndex < songList.length - 1)
    songIndex += 1;
  else songIndex = 0;
  
  // Load and play the new song
  loadSong(songIndex);
  playSong();
}
  
function prevSong() {
  // Go back to the last song if the current one is the first in the song list
  if (songIndex > 0)
    songIndex -= 1;
  else songIndex = songList.length - 1;
    
  // Load and play the new song
  loadSong(songIndex);
  playSong();
}




function playSliderTo() {
  // Calculate the play position by the percentage of the play slider and get the relative duration to the song
  seekto = currSong.duration * (playSlider.value / 100);
  
  // Set the current song position to the calculated play position
  currSong.currentTime = seekto;
}

function sliderUpdate() {
  
  let sliderPosition = 0;
  
  // Check if the current song duration is a legible number
  if (!isNaN(currSong.duration)) {
    sliderPosition = currSong.currentTime * (100 / currSong.duration);
    playSlider.value = sliderPosition;
  
    // Calculate the time left and the total duration
    let currentMinutes = Math.floor(currSong.currentTime / 60);
    let currentSeconds = Math.floor(currSong.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(currSong.duration / 60);
    let durationSeconds = Math.floor(currSong.duration - durationMinutes * 60);
  
    // Add a zero to the single digit time values
    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
  
    // Display the updated duration
    currTime.textContent = currentMinutes + ":" + currentSeconds;
    totalDuration.textContent = durationMinutes + ":" + durationSeconds;
  }
}



// Load the first track in the tracklist
loadSong(songIndex);


// Imp topics to understand and note down
// 1) Timer - setInterval, clear interval
// 2) Audio - play,pause,duration,.src
// 3) document.createElement('audio')
// 4) seekto
// 5) file paths - (why live server and crome diffeeent paths)
// 6) onclick(), onchange() in HTML
// 7) input type ="range" details - .value(playSlider.value)
// 8) put project on github