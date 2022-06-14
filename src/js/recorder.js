const VideoBtn = document.querySelector("#VideoBtn");
const recordVideo = document.querySelector("#recordVideo");
const RecordForm = document.querySelector("#RecordForm");

let stream;
let recorder;
let videoFile;

const handleUpload = async () => {
  VideoBtn.innerText = "Start Video Recording";
  recordVideo.style.visibility = "hidden";
  VideoBtn.removeEventListener("click", handleUpload);
  VideoBtn.addEventListener("click", handleStart);

  // videoFile url to submit
  const videoInput = document.createElement("input");
  videoInput.type = "text";
  videoInput.name = "file";
  videoInput.value = videoFile;
  RecordForm.appendChild(videoInput);

  // date and title to upload
  const uploadBtn = document.createElement("input");
  uploadBtn.type = "submit";
  RecordForm.appendChild(uploadBtn);
  uploadBtn.click();

  RecordForm.removeChild(uploadBtn);
  RecordForm.removeChild(videoInput);
};

const handleStop = () => {
  VideoBtn.innerText = "Upload Video Recording";
  VideoBtn.removeEventListener("click", handleStop);
  VideoBtn.addEventListener("click", handleUpload);
  recorder.stop();
};

const handleStart = async () => {
  VideoBtn.innerText = "Stop Video Recording";
  VideoBtn.removeEventListener("click", handleStart);
  VideoBtn.addEventListener("click", handleStop);
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

VideoBtn.addEventListener("click", handleStart);
