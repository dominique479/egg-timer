// =======================
// Generic Egg Timer Setup with Progress Bar and "Done" GIF
// =======================
function startEggTimer(timerId, totalTime, progressBarId, gifElementId, textElementId, restartButtonId, homeButtonId) {
    const countdownElement = document.getElementById(timerId);
    const progressBar = document.getElementById(progressBarId);
    const gifElement = document.getElementById(gifElementId);
    const textElement = document.getElementById(textElementId);
    const restartButton = document.getElementById(restartButtonId);
    const homeButton = document.getElementById(homeButtonId);

    if (!countdownElement || !progressBar || !gifElement || !textElement || !restartButton || !homeButton) return;

    let timeLeft = totalTime;
    let timer;

    function updateTimer() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

        countdownElement.textContent = formattedTime;

        const progress = (totalTime - timeLeft) / totalTime * 100;
        progressBar.style.width = `${progress}%`;

        if (timeLeft > 0) {
            timeLeft--;
        } else {
            clearInterval(timer);
            if (textElement.textContent !== "YOUR EGG IS DONE!") {
                textElement.textContent = "YOUR EGG IS DONE!";
                progressBar.style.width = "100%";
                gifElement.src = "images/chicken.gif";
                const sound = new Audio("sound/done.mp3");
                sound.volume = 0.4;
                sound.play();
            }
        }
    }

    timer = setInterval(updateTimer, 1000);
    updateTimer();

    // Restart Button: Reset the timer and progress bar
    restartButton.addEventListener("click", () => {
        clearInterval(timer);
        timeLeft = totalTime;
        progressBar.style.width = "0%";
        gifElement.src = "images/egg.gif"; // Reset GIF to the initial boiling egg GIF
        textElement.textContent = "Your egg will be ready in:"; // Reset text to the initial value
        updateTimer();
        timer = setInterval(updateTimer, 1000);
    });

    // Home Button: Redirect to home or reset UI
    homeButton.addEventListener("click", () => {
        clearInterval(timer);
        const modal = document.getElementById("home-confirmation-modal");
        modal.classList.remove("hidden"); // Show the modal
    });

    document.getElementById("confirm-home-button").addEventListener("click", () => {
        window.location.href = "index.html"; // Redirect to the homepage
    });

    document.getElementById("cancel-home-button").addEventListener("click", () => {
        const modal = document.getElementById("home-confirmation-modal");
        modal.classList.add("hidden"); // Hide the modal
        if (!timer) {
            timer = setInterval(updateTimer, 1000); // Resume the timer only if it's not already running
        }
    });
}

// =======================
// Initialize Timers with Progress Bar and "Chicken" GIF
// =======================
startEggTimer("runny-countdown", 6 * 60, "runny-progress", "runny-gif", "runny-text", "runny-restart-button", "runny-home-button");
startEggTimer("soft-countdown", 8 * 60, "soft-progress", "soft-gif", "soft-text", "soft-restart-button", "soft-home-button");
startEggTimer("hard-countdown", 10 * 60, "hard-progress", "hard-gif", "hard-text", "hard-restart-button", "hard-home-button");
startEggTimer("overcooked-countdown", 15 * 60, "overcooked-progress", "overcooked-gif", "overcooked-text", "overcooked-restart-button", "overcooked-home-button");