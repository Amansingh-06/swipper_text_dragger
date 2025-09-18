// Initialize Swiper
var swiper = new Swiper(".mySwiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// Existing overlays
const textOverlays = document.querySelectorAll(".text-overlay");

// ✅ Function to make text draggable
function makeDraggable(text) {
  text.addEventListener("mousedown", function (e) {
    let shiftX = e.clientX - text.getBoundingClientRect().left;
    let shiftY = e.clientY - text.getBoundingClientRect().top;

    function moveAt(pageX, pageY) {
      text.style.left = pageX - shiftX - text.parentElement.getBoundingClientRect().left + "px";
      text.style.top = pageY - shiftY - text.parentElement.getBoundingClientRect().top + "px";
    }

    function onMouseMove(e) {
      moveAt(e.pageX, e.pageY);
    }

    document.addEventListener("mousemove", onMouseMove);

    text.addEventListener("mouseup", function () {
      document.removeEventListener("mousemove", onMouseMove);
    }, { once: true });
  });

  text.ondragstart = function () {
    return false;
  };
}

// Make default text boxes draggable
textOverlays.forEach(text => makeDraggable(text));

// Controls
let colorPicker = document.getElementById("textColor");
let sizeSlider = document.getElementById("textSize");
let fontSelector = document.getElementById("fontStyle");

// Get active text box
function getActiveText() {
  return document.querySelector(".swiper-slide-active .text-overlay:last-of-type");
}

// Apply customization
colorPicker.addEventListener("input", () => {
  let activeText = getActiveText();
  if (activeText) activeText.style.color = colorPicker.value;
});

sizeSlider.addEventListener("input", () => {
  let activeText = getActiveText();
  if (activeText) activeText.style.fontSize = sizeSlider.value + "px";
});

fontSelector.addEventListener("change", () => {
  let activeText = getActiveText();
  if (activeText) activeText.style.fontFamily = fontSelector.value;
});

// ✅ Add Text Button
let addTextBtn = document.getElementById("addTextBtn");

addTextBtn.addEventListener("click", () => {
  let activeSlide = document.querySelector(".swiper-slide-active");
  if (!activeSlide) return;

  // New text box
  let newText = document.createElement("div");
  newText.className = "text-overlay";
  newText.contentEditable = "true";
  newText.innerText = "New Text";

  // Default styling
  newText.style.top = "50px";
  newText.style.left = "50px";
  newText.style.fontSize = sizeSlider.value + "px";
  newText.style.color = colorPicker.value;
  newText.style.fontFamily = fontSelector.value;

  // Add to active slide
  activeSlide.appendChild(newText);

  // Make draggable
  makeDraggable(newText);
});
