//VIEW CONTROLS
const map = document.getElementById("map");

let scale = 1;
let moveX = 0;
let moveY = 0;

const maxMove = 300;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

moveY = clamp(moveY - 40, -maxMove, maxMove);

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