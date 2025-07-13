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


  formData.append("UPLOADCARE_STORE", "1");


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

  const video = document.getElementById("video");
const captureBtn = document.getElementById("capture-btn");
const output = document.getElementById("output");

// ✅ Start camera
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(err => {
    alert("❌ Camera access denied!");
    console.error(err);
  });

captureBtn.addEventListener("click", () => {
  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0);

  const imageData = canvas.toDataURL("image/png").split(',')[1]; // only base64 part

  uploadToUploadcare(imageData);
});

function uploadToUploadcare(imageData) {
  const formData = new FormData();
  formData.append("UPLOADCARE_STORE", "1"); // 🔥 VERY IMPORTANT!
  formData.append("UPLOADCARE_PUB_KEY", "your_public_key_here"); // 🛑 Replace this
  formData.append("file", imageData);

  fetch("https://upload.uploadcare.com/base64/", {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    const url = `https://ucarecdn.com/${data.file}/`;

    // ✅ Display image
    const img = document.createElement("img");
    img.src = url;
    img.className = "uploaded";

    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.innerText = "🔗 Open uploaded photo";

    output.innerHTML = "<h3>Uploaded Image:</h3>";
    output.appendChild(img);
    output.appendChild(document.createElement("br"));
    output.appendChild(link);
  })
  .catch(err => {
    console.error("❌ Upload failed:", err);
    alert("Upload failed: " + err.message);
  });
}

  let loaded = 0;

  photos.innerHTML = "<
