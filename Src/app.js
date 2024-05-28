// DOM ELEMENTS

const timer = document.querySelector(".timer");
const playPauseBtn = document.getElementById("play-pause");
const stopBtn = document.getElementById("stop");
const playIcon = document.querySelector(".fa-play");
const closeModal = document.querySelectorAll(".fa-x");
const modalClose = document.querySelectorAll(".modalClose");
const secondAdd = document.getElementById("secondAdd");
const overlay = document.getElementById("overlay");
const modal = document.querySelector(".modal");
const timeInput = document.getElementById("timeInput");
const submitBtn = document.getElementById("submitBtn");
const error = document.getElementById("error");

// let timerValue;
let secondValue = 0;
let timerFunc;

//Saniyeni guncelleyerek 00:00:00 formatinda yazmaq ucun funksiya

function updateTimerDisplay() {
  const hour = Math.floor(secondValue / 3600) % 24;
  const minute = Math.floor((secondValue % 3600) / 60);
  const second = secondValue % 60;
  return (timer.textContent = `${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}:${second.toString().padStart(2, "0")}`);
}

// setInterval funksiyasini cagirmaq ucun istifade olunan funksiya

function startTimer() {
  if (timerFunc) clearInterval(timerFunc);
  timerFunc = setInterval(() => {
    if (secondValue <= 0) {
      clearInterval(timerFunc);
      timer.textContent = "00:00:00";
    } else {
      secondValue--;
      updateTimerDisplay();
    }
  }, 1000);
}

// Bu funksiyani cagiraraq istediyimiz anda intervali dayandiririq
function stopTimer() {
  clearInterval(timerFunc);
}

// Iconlarin deyismesi prosesi ve timerin baslatilmasi

playPauseBtn.addEventListener("click", () => {
  if (playIcon.classList.contains("fa-play") && !secondValue == 0) {
    playIcon.classList.remove("fa-play");
    playIcon.classList.add("fa-pause");
    startTimer();
  } else {
    playIcon.classList.add("fa-play");
    playIcon.classList.remove("fa-pause");
    stopTimer();
  }
});

stopBtn.addEventListener("click", () => {
  stopTimer();
  secondValue = 0;
  timer.textContent = "00:00:00";
  playIcon.classList.add("fa-play");
  playIcon.classList.remove("fa-pause");
});

// Modal baglama ve modal acma

function openModalFunc() {
  overlay.classList.remove("hidden");
  modal.classList.remove("hidden");
}

function closeModalFunc() {
  overlay.classList.add("hidden");
  modal.classList.add("hidden");
}

closeModal.forEach((item) => {
  item.addEventListener("click", () => {
    modalClose.forEach((modalItem) => {
      modalItem.classList.add("hidden");
    });
  });
});

overlay.addEventListener("click", () => {
  closeModalFunc();
});

// Saniyeni daxil etmek ucun button

secondAdd.addEventListener("click", () => {
  openModalFunc();
});

function updateTimerValue() {
  const trimInputValue = Math.floor(Number(timeInput.value.trim()));
  if (!isNaN(trimInputValue) && trimInputValue <= 120 && trimInputValue > 0) {
    timerValue = trimInputValue;
    secondValue = timerValue * 60;
    timer.textContent = updateTimerDisplay();
    closeModalFunc();
    timeInput.value = "";
  } else {
    closeModalFunc();
    error.classList.remove("hidden");
    timeInput.value = "";
  }
}

submitBtn.addEventListener("click", updateTimerValue);

document.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    updateTimerValue();
  }
});
