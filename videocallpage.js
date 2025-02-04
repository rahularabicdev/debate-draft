const localVideo = document.getElementById('local-video');
const muteButton = document.getElementById('mute-btn');
const videoButton = document.getElementById('video-btn');
const blurButton = document.getElementById('blur-btn');
const virtualBgButton = document.getElementById('virtual-bg-btn');
const virtualBgInput = document.getElementById('virtual-bg-input');
const raiseHandButton = document.getElementById('raise-hand-btn');
const endCallButton = document.getElementById('end-call-btn');
const screenShareButton = document.getElementById('screen-share-btn');
const recordButton = document.getElementById('record-btn');
const sendButton = document.getElementById('send-btn');
const chatInput = document.getElementById('chat-input');
const chatBox = document.getElementById('chat-box');

let localStream;
let isMuted = false;
let isVideoEnabled = true;
let isBlurred = false;
let isRecording = false;
let recorder;
let recordedChunks = [];
let username = "Rohini";

// Start Local Video
async function startLocalVideo() {
    try {
        // Request camera and microphone access
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideo.srcObject = localStream;
    } catch (error) {
        alert("Unable to access camera or microphone. Please allow access to your devices.");
    }
}

// Ensure local video is initialized when the page loads
window.onload = startLocalVideo;

// Mute/Unmute Button
muteButton.addEventListener('click', () => {
    if (localStream && localStream.getAudioTracks().length > 0) {
        isMuted = !isMuted;
        localStream.getAudioTracks()[0].enabled = !isMuted;
        muteButton.textContent = isMuted ? "Unmute" : "Mute";
    }
});

// Stop/Start Video Button
videoButton.addEventListener('click', () => {
    if (localStream && localStream.getVideoTracks().length > 0) {
        isVideoEnabled = !isVideoEnabled;
        localStream.getVideoTracks()[0].enabled = isVideoEnabled;
        videoButton.textContent = isVideoEnabled ? "Stop Video" : "Start Video";
    }
});

// Blur Background Button
blurButton.addEventListener('click', () => {
    if (isBlurred) {
        localVideo.style.filter = "none";
        blurButton.textContent = "Blur Background";
    } else {
        localVideo.style.filter = "blur(8px)";
        blurButton.textContent = "Unblur Background";
    }
    isBlurred = !isBlurred;
});

// Virtual Background Button
virtualBgButton.addEventListener('click', () => {
    virtualBgInput.click();
});

virtualBgInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            localVideo.style.backgroundImage = `url(${reader.result})`;
            localVideo.style.backgroundSize = "cover";
            localVideo.style.backgroundPosition = "center";
        };
        reader.readAsDataURL(file);
    }
});

// Raise Hand Button
raiseHandButton.addEventListener('click', () => {
    const handMessage = document.createElement('div');
    handMessage.innerHTML = `<span>🙋‍♂️</span> <strong>${username}</strong> raised their hand.`;
    chatBox.appendChild(handMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
});

// Chat Send Button
sendButton.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if (message) {
        const chatMessage = document.createElement('div');
        chatMessage.innerHTML = `<strong>${username}:</strong> ${message}`;
        chatBox.appendChild(chatMessage);
        chatBox.scrollTop = chatBox.scrollHeight;
        chatInput.value = "";
    }
});

// Screen Share Button
screenShareButton.addEventListener('click', async () => {
    try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        localVideo.srcObject = screenStream;

        // Stop sharing screen on stream end
        screenStream.getVideoTracks()[0].onended = () => {
            localVideo.srcObject = localStream;
        };
    } catch (error) {
        alert("Failed to share the screen.");
    }
});

// Recording Button
recordButton.addEventListener('click', () => {
    if (!localStream) {
        alert("Local video stream is not available. Please check your camera and microphone access.");
        return;
    }

    if (isRecording) {
        recorder.stop();
        recordButton.textContent = "Start Recording";
        isRecording = false;
    } else {
        // Ensure localStream is available before recording
        if (!localStream) {
            alert("Local video stream is not available.");
            return;
        }

        recordedChunks = [];
        try {
            // Make sure to pass the correct media stream
            recorder = new MediaRecorder(localStream);

            recorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    recordedChunks.push(event.data);
                }
            };

            recorder.onstop = () => {
                const blob = new Blob(recordedChunks, { type: "video/webm" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = "recording.webm";
                a.click();
            };

            recorder.start();
            recordButton.textContent = "Stop Recording";
            isRecording = true;
        } catch (error) {
            alert("Error starting recording: " + error.message);
        }
    }
});

// End Call Button
endCallButton.addEventListener('click', () => {
    const confirmEnd = confirm("Are you sure you want to end the call?");
    if (confirmEnd && localStream) {
        localStream.getTracks().forEach(track => track.stop());
        localVideo.srcObject = null;
    }
});










