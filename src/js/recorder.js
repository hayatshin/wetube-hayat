const VideoBtn = document.querySelector("#VideoBtn");
const recordVideo = document.querySelector("#recordVideo");
const RecordForm = document.querySelector("#RecordForm");
const List = document.querySelector("List");
const VideoTitle = document.querySelector("#VideoTitle");
const SubmitBtn = document.querySelector("#SubmitBtn");

let stream;
let recorder;
let videoFile;

// const handleVideoUpload = () => {
//   VideoBtn.innerText = "Submit Video Recording";
//   VideoBtn.removeEventListener("click", handleVideoUpload);
//   VideoBtn.addEventListener("click", handleVideoSubmit);

//   // videoFile url to submit
//   const fileInput = document.createElement("input");
//   fileInput.type = "file";
//   fileInput.id = "file";
//   fileInput.name = "file";
//   fileInput.accept = "video/mp4,video/mkv, video/x-m4v,video/*";
//   RecordForm.appendChild(fileInput);
// };

const handleVideoDownload = async () => {
  VideoBtn.innerText = "Start Video Recording";
  VideoBtn.removeEventListener("click", handleVideoDownload);
  VideoBtn.addEventListener("click", handleVideoStart);

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

VideoBtn.addEventListener("click", handleVideoStart);
