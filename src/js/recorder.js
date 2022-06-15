const VideoBtn = document.querySelector("#VideoBtn");
const AudioBtn = document.querySelector("#AudioBtn");
const recordVideo = document.querySelector("#recordVideo");
const recordAudio = document.querySelector("#recordAudio");
const AudioBox = document.querySelector("#AudioBox");
const RecordForm = document.querySelector("#RecordForm");

let stream;
let recorder;
let videoFile;

const handleVideoUpload = async () => {
  VideoBtn.innerText = "Start Video Recording";
  recordVideo.style.visibility = "hidden";
  VideoBtn.removeEventListener("click", handleVideoUpload);
  VideoBtn.addEventListener("click", handleVideoStart);

  // videoFile url to submit
  const videoInput = document.createElement("input");
  videoInput.type = "text";
  videoInput.name = "file";
  videoInput.value = videoFile;
  RecordForm.appendChild(videoInput);

  // type to submit
  const typeInput = document.createElement("input");
  typeInput.type = "text";
  typeInput.name = "type";
  typeInput.value = "video";
  RecordForm.appendChild(typeInput);

  // date and title to upload
  const uploadBtn = document.createElement("input");
  uploadBtn.type = "submit";
  RecordForm.appendChild(uploadBtn);
  uploadBtn.click();

  RecordForm.removeChild(uploadBtn);
  RecordForm.removeChild(typeInput);
  RecordForm.removeChild(videoInput);
};

const handleVideoStop = () => {
  VideoBtn.innerText = "Upload Video Recording";
  VideoBtn.removeEventListener("click", handleVideoStop);
  VideoBtn.addEventListener("click", handleVideoUpload);
  recorder.stop();
};

const handleVideoStart = async () => {
  VideoBtn.innerText = "Stop Video Recording";
  VideoBtn.removeEventListener("click", handleVideoStart);
  VideoBtn.addEventListener("click", handleVideoStop);
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
  });
  recordVideo.srcObject = stream;
  recordVideo.play();
  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (event) => {
    videoFile = URL.createObjectURL(event.data);
    recordVideo.srcObject = null;
    recordVideo.src = videoFile;
    recordVideo.play();
  };
  recorder.start();
};

const handleAudioUpload = () => {
  AudioBtn.innerText = "Start Audio Recording";
  AudioBtn.removeEventListener("click", handleAudioUpload);
  AudioBtn.addEventListener("click", handleAudioStart);

  // videoFile url to submit
  const audioInput = document.createElement("input");
  audioInput.type = "text";
  audioInput.name = "file";
  audioInput.value = videoFile;
  RecordForm.appendChild(audioInput);

  // type to submit
  const typeInput = document.createElement("input");
  typeInput.type = "text";
  typeInput.name = "type";
  typeInput.value = "audio";
  RecordForm.appendChild(typeInput);

  // date and title to upload
  const uploadBtn = document.createElement("input");
  uploadBtn.type = "submit";
  RecordForm.appendChild(uploadBtn);
  uploadBtn.click();

  RecordForm.removeChild(uploadBtn);
  RecordForm.removeChild(audioInput);
};

const handleAudioStop = () => {
  AudioBtn.innerText = "Upload Audio Recording";
  AudioBtn.removeEventListener("click", handleAudioStop);
  AudioBtn.addEventListener("click", handleAudioUpload);
  recorder.stop();
};

const handleAudioStart = async () => {
  AudioBtn.innerText = "Stop Audio Recording";
  AudioBtn.removeEventListener("click", handleAudioStart);
  AudioBtn.addEventListener("click", handleAudioStop);
  stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: false,
  });
  recordAudio.srcObject = stream;
  recordAudio.play();
  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (event) => {
    videoFile = URL.createObjectURL(event.data);
    recordAudio.srcObject = null;
    recordAudio.src = videoFile;
    recordAudio.play();
  };
  recorder.start();
};

VideoBtn.addEventListener("click", handleVideoStart);
AudioBtn.addEventListener("click", handleAudioStart);
