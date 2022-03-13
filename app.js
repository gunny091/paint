const colors = document.querySelectorAll(".controls__color");

const range = document.querySelector("#range");

const mode = document.querySelector("#mode");
const save = document.querySelector("#save");
const clear = document.querySelector("#clear");

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const DEFAULT_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
ctx.strokeStyle = DEFAULT_COLOR;

ctx.fillStyle = "#ffffff";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.fillStyle = DEFAULT_COLOR;
ctx.lineWidth = 2;

let painting = false;
let filling = false;

function start() {
  painting = true;
}
function stop() {
  painting = false;
}

if (canvas) {
  canvas.addEventListener("mousemove", e => {
    const x = e.offsetX;
    const y = e.offsetY;
    if (!painting) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  });
  canvas.addEventListener("mousedown", start);
  canvas.addEventListener("mouseup", stop);
  canvas.addEventListener("mouseleave", stop);
  canvas.addEventListener("click", e => {
    if (filling) {
      ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
  });
  canvas.addEventListener("contextmenu", e => {
    e.preventDefault();
  });
}

if (colors) {
  Array.from(colors).forEach(color => {
    color.addEventListener("click", e => {
      const color = e.target.style.backgroundColor;
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
    });
  });
}
if (range) {
  range.addEventListener("input", e => {
    const value = e.target.value;
    ctx.lineWidth = value;
  });
}
if (mode) {
  mode.addEventListener("click", e => {
    if (filling) {
      filling = false;
      mode.innerText = "Fill";
    } else {
      filling = true;
      mode.innerText = "Paint";
    }
  });
}
if (save) {
  save.addEventListener("click", () => {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "paint";
    link.click();
  });
}
if (clear) {
  clear.addEventListener("click", () => {
    const prev = ctx.fillStyle;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    ctx.fillStyle = prev;
  });
}
