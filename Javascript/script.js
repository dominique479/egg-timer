// =======================
// Egg Timer Function (Generic)
// =======================
function startEggTimer(config) {
    const {
      timerId,
      totalTime,
      progressBarId,
      gifElementId,
      textElementId,
      restartButtonId,
      homeButtonId,
    } = config;
  
    const countdownElement = document.getElementById(timerId);
    const progressBar = document.getElementById(progressBarId);
    const gifElement = document.getElementById(gifElementId);
    const textElement = document.getElementById(textElementId);
    const restartButton = document.getElementById(restartButtonId);
    const homeButton = document.getElementById(homeButtonId);
    const modal = document.getElementById("home-confirmation-modal");
    const confirmButton = document.getElementById("confirm-home-button");
    const cancelButton = document.getElementById("cancel-home-button");
  
    // Exit if required elements are missing
    if (
      !countdownElement ||
      !progressBar ||
      !gifElement ||
      !textElement ||
      !restartButton ||
      !homeButton ||
      !modal ||
      !confirmButton ||
      !cancelButton
    ) {
      return;
    }
  
    let timeLeft = totalTime;
    let timer;
  
    // =======================
    // Timer Logic
    // =======================
    function updateTimer() {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      countdownElement.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  
      const progress = ((totalTime - timeLeft) / totalTime) * 100;
      progressBar.style.width = `${progress}%`;
  
      if (timeLeft > 0) {
        timeLeft--;
      } else {
        clearInterval(timer);
        textElement.textContent = "YOUR EGG IS DONE!";
        progressBar.style.width = "100%";
        gifElement.src = "../images/chicken.gif";
        const sound = new Audio("../sound/done.mp3");
        sound.volume = 0.4;
        sound.play();
      }
    }
  
    // Start timer
    timer = setInterval(updateTimer, 1000);
    updateTimer();
  
    // =======================
    // Restart Button
    // =======================
    restartButton.addEventListener("click", () => {
      clearInterval(timer);
      timeLeft = totalTime;
      progressBar.style.width = "0%";
      gifElement.src = "../images/egg.gif";
      textElement.textContent = "Your egg will be ready in:";
      timer = setInterval(updateTimer, 1000);
      updateTimer();
    });
  
    // =======================
    // Home Button & Modal Logic
    // =======================
    homeButton.addEventListener("click", () => {
      clearInterval(timer);
      modal.classList.remove("hidden");
    });
  
    confirmButton.addEventListener("click", () => {
      window.location.href = "../index.html";
    });
  
    cancelButton.addEventListener("click", () => {
      modal.classList.add("hidden");
      timer = setInterval(updateTimer, 1000); // Resume if cancelled
    });
  }
  
  // =======================
  // Init Timers (only run if matching elements exist)
  // =======================
  const eggConfigs = [
    {
      timerId: "runny-countdown",
      totalTime: 6 * 60,
      progressBarId: "runny-progress",
      gifElementId: "runny-gif",
      textElementId: "runny-text",
      restartButtonId: "runny-restart-button",
      homeButtonId: "runny-home-button",
    },
    {
      timerId: "soft-countdown",
      totalTime: 8 * 60,
      progressBarId: "soft-progress",
      gifElementId: "soft-gif",
      textElementId: "soft-text",
      restartButtonId: "soft-restart-button",
      homeButtonId: "soft-home-button",
    },
    {
      timerId: "hard-countdown",
      totalTime: 10 * 60,
      progressBarId: "hard-progress",
      gifElementId: "hard-gif",
      textElementId: "hard-text",
      restartButtonId: "hard-restart-button",
      homeButtonId: "hard-home-button",
    },
    {
      timerId: "overcooked-countdown",
      totalTime: 15 * 60,
      progressBarId: "overcooked-progress",
      gifElementId: "overcooked-gif",
      textElementId: "overcooked-text",
      restartButtonId: "overcooked-restart-button",
      homeButtonId: "overcooked-home-button",
    },
  ];
  
  // Loop through and start the appropriate timer
  eggConfigs.forEach(config => startEggTimer(config));  