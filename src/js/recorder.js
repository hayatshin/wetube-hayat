const VideoBtn = document.querySelector("#VideoBtn");
const AudioBtn = document.querySelector("#AudioBtn");
const recordVideo = document.querySelector("#recordVideo");
const recordAudio = document.querySelector("#recordAudio");
const AudioBox = document.querySelector("#AudioBox");
const RecordForm = document.querySelector("#RecordForm");
const List = document.querySelector("List");
const VideoTitle = document.querySelector("#VideoTitle");

let stream;
let recorder;
let videoFile;

const handleVideoSubmit = () => {
  VideoBtn.innerText = "Start Video Recording";
  VideoBtn.removeEventListener("click", handleVideoSubmit);
  VideoBtn.addEventListener("click", handleVideoStart);

  // date and title to upload
  const uploadBtn = document.createElement("input");
  uploadBtn.type = "submit";
  RecordForm.appendChild(uploadBtn);
  uploadBtn.click();
};

const handleVideoUpload = () => {
  VideoBtn.innerText = "Submit Video Recording";
  VideoBtn.removeEventListener("click", handleVideoUpload);
  VideoBtn.addEventListener("click", handleVideoSubmit);

  // videoFile url to submit
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.id = "file";
  fileInput.name = "file";
  fileInput.accept = "video/mp4,video/mkv, video/x-m4v,video/*";
  RecordForm.appendChild(fileInput);
};

const handleVideoDownload = async () => {
  VideoBtn.innerText = "Upload Video Recording";
  VideoBtn.removeEventListener("click", handleVideoDownload);
  VideoBtn.addEventListener("click", handleVideoUpload);

  const a = document.createElement("a");
  a.href = videoFile;
  a.download = "MyRecording.webm";
  RecordForm.appendChild(a);
  a.click();
};

const handleVideoStop = () => {
  VideoBtn.innerText = "Download Video Recording";
  VideoBtn.removeEventListener("click", handleVideoStop);
  VideoBtn.addEventListener("click", handleVideoDownload);
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
  recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
  recorder.ondataavailable = (event) => {
    videoFile = URL.createObjectURL(event.data);
    recordVideo.srcObject = null;
    recordVideo.src = videoFile;
    recordVideo.play();
  };
  recorder.start();
};

// AUDIO ****

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
  recorder = new MediaRecorder(stream, { mimeType: "video/ebm" });
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
