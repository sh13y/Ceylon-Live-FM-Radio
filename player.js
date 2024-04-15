var audio;
var volume = 1;
var currentChannelName = "Not playing"; // Default value for current channel name

window.onload = function() {
    var loadingAnimation = document.querySelector('.loading-animation');
    loadingAnimation.style.display = 'none'; // Hide loading animation initially
};

function play(channelUrl, channelName) {
    var loadingAnimation = document.querySelector('.loading-animation');
    loadingAnimation.style.display = 'block'; // Show loading animation

    if (audio != null) {
        pauseAudio();
    }
    audio = new Audio();
    audio.src = channelUrl;
    audio.load();
    audio.play();
    audio.volume = volume;

    // Hide loading animation after audio has loaded
    audio.addEventListener('canplay', function() {
        loadingAnimation.style.display = 'none';
    });

    // Update current channel name
    currentChannelName = channelName;
    updateCurrentChannel();
}

function pauseAudio() {
    if (audio != null) {
        if (audio.paused) {
            audio.play(); // If paused, resume playback
        } else {
            audio.pause(); // If playing, pause playback
        }
    }
}

function mute() {
    if (audio != null) {
        audio.volume == 0 ? (audio.volume = volume) : (audio.volume = 0);
    }
    changeIcon();
}

function changeVolume() {
    var val = document.getElementById("volume-range-min").value;
    volume = val / 100;
    if (audio != null) {
        audio.volume = volume;
    }
    changeIcon();
}

function toggleAudio() {
    if (audio != null) {
        if (audio.paused) {
            audio.play();
            document.getElementById("audioButton").innerHTML = "Pause";
            document.getElementById("audioButton").classList.remove("paused");
        } else {
            audio.pause();
            document.getElementById("audioButton").innerHTML = "Resume";
            document.getElementById("audioButton").classList.add("paused");
        }
    }
}

function updateCurrentChannel() {
    var currentChannelElement = document.getElementById("currentChannel");
    currentChannelElement.textContent = "" + currentChannelName;
}
