//VIEW CONTROLS
const map = document.getElementById("map");

let scale = 1;
let moveX = 0;
let moveY = 0;

const maxMove = 300;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function updateView() {
  map.style.transform = `translate(${moveX}px, ${moveY}px) scale(${scale})`;
}

document.getElementById("zoom-in").addEventListener("click", function () {
  scale = Math.min(scale + 0.2, 2.5);    // max zoom
  updateView();
});

document.getElementById("zoom-out").addEventListener("click", function () {
  scale = Math.max(scale - 0.2, 0.5);    // min zoom
  updateView();
});

document.getElementById("move-up").addEventListener("click", function () {
  moveY = clamp(moveY + 40, -maxMove, maxMove);
  updateView();
});

document.getElementById("move-down").addEventListener("click", function () {
  moveY = clamp(moveY - 40, -maxMove, maxMove);
  updateView();
});

document.getElementById("move-left").addEventListener("click", function () {
  moveX = clamp(moveX + 40, -maxMove, maxMove);
  updateView();
});

document.getElementById("move-right").addEventListener("click", function () {
  moveX = clamp(moveX - 40, -maxMove, maxMove);
  updateView();
});

document.getElementById("reset-view").addEventListener("click", function () {
  scale = 1;
  moveX = 0;
  moveY = 0;
  updateView();
});

//BONUS - NAVIGATION PAD
const viewport = document.getElementById("viewport");

viewport.addEventListener("wheel", function(event) {
  event.preventDefault();

  if (event.deltaY < 0) {
    scale = Math.min(scale + 0.1, 2.5);
  } else {
    scale = Math.max(scale - 0.1, 0.5);
  }

  updateView();
}, { passive: false });

let isDragging = false;
let startX, startY;
let initialX, initialY;

viewport.addEventListener("mousedown", function(event) {
  if (event.target.closest(".seat")) return;

  isDragging = true;

  startX = event.clientX;
  startY = event.clientY;

  initialX = moveX;
  initialY = moveY;

  viewport.style.cursor = "grabbing";
});

document.addEventListener("mousemove", function(event) {
  if (!isDragging) return;

  moveX = clamp(initialX + (event.clientX - startX), -maxMove, maxMove);
  moveY = clamp(initialY + (event.clientY - startY), -maxMove, maxMove);

  updateView();
});

document.addEventListener("mouseup", function() {
  isDragging = false;
  viewport.style.cursor = "grab";
});

document.getElementById("nav-up").onclick = () => {
    moveY = clamp(moveY + 40, -maxMove, maxMove);
    updateView();
};

document.getElementById("nav-down").onclick = () => {
    moveY = clamp(moveY - 40, -maxMove, maxMove);
    updateView();
};

document.getElementById("nav-left").onclick = () => {
    moveX = clamp(moveX + 40, -maxMove, maxMove);
    updateView();
};

document.getElementById("nav-right").onclick = () => {
    moveX = clamp(moveX - 40, -maxMove, maxMove);
    updateView();
};

document.getElementById("nav-reset").onclick = () => {
    scale = 1;
    moveX = 0;
    moveY = 0;
    updateView();
};

document.getElementById("nav-zoom-in").onclick = () => {
    scale = Math.min(scale + 0.2, 2.5);
    updateView();
};

document.getElementById("nav-zoom-out").onclick = () => {
    scale = Math.max(scale - 0.2, 0.5);
    updateView();
};