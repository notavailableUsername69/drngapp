// Get the canvas element
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

// Set canvas width and height to full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Variables to store current position
let currentX = 0;
let currentY = 0;
let prevX = 0;
let prevY = 0;
let drawing = false;

// Color
let currentColor = "#000";

// Undo and Redo
let undoStack = [];
let redoStack = [];

// Set up event listeners
canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("touchstart", startPosition);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("touchmove", draw);
canvas.addEventListener("mouseup", endPosition);
canvas.addEventListener("touchend", endPosition);

// Start drawing
function startPosition(e) {
  drawing = true;
  const rect = canvas.getBoundingClientRect();
  [prevX, prevY] = [e.clientX - rect.left, e.clientY - rect.top];
}

// Draw
function draw(e) {
  if (!drawing) return;
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  context.beginPath();
  context.strokeStyle = currentColor;
  context.lineWidth = 5;
  context.moveTo(prevX, prevY);
  context.lineTo(x, y);
  context.stroke();
  [prevX, prevY] = [x, y];
}

// End drawing
function endPosition() {
  drawing = false;
  undoStack.push(context.getImageData(0, 0, canvas.width, canvas.height));
}

// Clear canvas
const clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click", () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  undoStack = [];
  redoStack = [];
});

// Color picker
const colorPicker = document.getElementById("colorPicker");
colorPicker.addEventListener("input", () => {
  currentColor = colorPicker.value;
});

// Undo
const undoBtn = document.getElementById("undoBtn");
undoBtn.addEventListener("click", () => {
  if (undoStack.length > 0) {
    redoStack.push(context.getImageData(0, 0, canvas.width, canvas.height));
    context.putImageData(undoStack.pop(), 0, 0);
  }
});

// Redo
const redoBtn = document.getElementById("redoBtn");
redoBtn.addEventListener("click", () => {
if (redoStack.length > 0) {
undoStack.push(context.getImageData(0, 0, canvas.width, canvas.height));
context.putImageData(redoStack.pop(), 0, 0);
}
});

// Eraser
const eraserBtn = document.getElementById("eraserBtn");
eraserBtn.addEventListener("click", () => {
currentColor = "#fff"; // Set the color to white for erasing
});
