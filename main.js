console.log("hey");
const micBtn = document.querySelector("#mic");

const playBack = document.querySelector(".playback");

micBtn.addEventListener("click", toggleMic);

let isRecording = false;
let isCanRecord = false;

let recorder = null;

let chunks = [];

const setUpAudio = () => {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(setUpStream)
      .catch((err) => console.log(err));
  }
};

setUpAudio();

function setUpStream(stream) {
  recorder = new MediaRecorder(stream);

  console.log(stream);

  recorder.ondataavailable = (e) => {
    chunks.push(e?.data);
  };
  recorder.onstop = (e) => {
    const blob = new Blob(chunks);
    chunks = [];

    console.log(blob)

    const audioUrl = window.URL.createObjectURL(blob);
    playBack.src = audioUrl;
  };
  isCanRecord = true;
}

function toggleMic() {
  if (!isCanRecord) return;

  isRecording = !isRecording;

  if (isRecording) {
    recorder.start();
    micBtn.classList.add("isRecording");
  } else {
    recorder.stop();
    micBtn.classList.add("isRecording");
  }
}
