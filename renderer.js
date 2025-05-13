const pomodoro = document.getElementById("pomodoro-timer");
const short = document.getElementById("short-timer");
const long = document.getElementById("long-timer");
const timers = document.querySelectorAll(".timer-display");

const session = document.getElementById("pomodoro-session");
const shortBreak = document.getElementById("short-break");
const longBreak = document.getElementById("long-break");

const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");

const timerMsg = document.getElementById("timer-message");

let currentTimer = null;
let myInterval = null;

// Show default timer on load
function showDefaultTimer() {
  pomodoro.style.display = "block";
  short.style.display = "none";
  long.style.display = "none";

  // Reset layout and hide image
  resetTimerLayout(pomodoro);
}
showDefaultTimer();

function hideAll() {
  timers.forEach((timer) => {
    timer.style.display = "none";
  });
}

// Session buttons
session.addEventListener("click", () => {
  hideAll();
  pomodoro.style.display = "block";
  setActive(session);
  currentTimer = pomodoro;
  resetTimerLayout(currentTimer);
});

shortBreak.addEventListener("click", () => {
  hideAll();
  short.style.display = "block";
  setActive(shortBreak);
  currentTimer = short;
  resetTimerLayout(currentTimer);
});

longBreak.addEventListener("click", () => {
  hideAll();
  long.style.display = "block";
  setActive(longBreak);
  currentTimer = long;
  resetTimerLayout(currentTimer);
});

function setActive(activeBtn) {
  session.classList.remove("active");
  shortBreak.classList.remove("active");
  longBreak.classList.remove("active");

  activeBtn.classList.add("active");
}

// Start timer
function startTimer(timerDisplay) {
  if (myInterval) clearInterval(myInterval);

  const duration = parseFloat(timerDisplay.getAttribute("data-duration"));
  const endTimestamp = Date.now() + duration * 60 * 1000;

  // Reset visibility of all pea images
  document.querySelectorAll(".pea-image").forEach(img => {
    img.classList.remove("visible");
    img.classList.add("hidden");
  });

  // Move the timer down
  timerDisplay.classList.add("timer-started");

  myInterval = setInterval(() => {
    const remaining = endTimestamp - Date.now();

    if (remaining <= 0) {
      clearInterval(myInterval);
      timerDisplay.querySelector("h1.time").textContent = "00:00";
      new Audio("assets/wave-defeated.mp3").play();
    } else {
      const minutes = Math.floor(remaining / 60000);
      const seconds = Math.floor((remaining % 60000) / 1000);
      timerDisplay.querySelector("h1.time").textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }
  }, 1000);

  // Show the image smoothly
  const imageWrapper = timerDisplay.querySelector(".pea-image");
  if (imageWrapper) {
    imageWrapper.classList.remove("hidden");
    setTimeout(() => imageWrapper.classList.add("visible"), 10);
  }
}
// Start button
startBtn.addEventListener("click", () => {
  if (currentTimer) {
    startTimer(currentTimer);
    timerMsg.style.display = "none";

    const imageWrapper = document.getElementById("pea-image");
    if (imageWrapper && !imageWrapper.classList.contains("visible")) {
      imageWrapper.classList.remove("hidden");
      setTimeout(() => {
        imageWrapper.classList.add("visible");
      }, 10);
    }

    currentTimer.classList.add("timer-started");
  } else {
    timerMsg.style.display = "block";
  }
});

// Stop button
stopBtn.addEventListener("click", () => {
  if (myInterval) {
    clearInterval(myInterval);
    myInterval = null;
  }

  if (currentTimer) {
    // Reset image visibility
    const imageWrapper = currentTimer.querySelector(".pea-image");
    if (imageWrapper) {
      imageWrapper.classList.remove("visible");
      imageWrapper.classList.add("hidden");
    }

    // Move timer back to center
    currentTimer.classList.remove("timer-started");
  }
});

// Reset timer layout and image
function resetTimerLayout(timerDisplay) {
  const imageWrapper = document.getElementById("pea-image");
  if (imageWrapper) {
    imageWrapper.classList.remove("visible");
    imageWrapper.classList.add("hidden");
  }
  timerDisplay.classList.remove("timer-started");
}
