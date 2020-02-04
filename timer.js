const timer_span = document.getElementById('base-timer-label')

function formatTimeLeft() {
    const minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    timer_span.innerHTML = `${minutes}:${seconds}`;
}

const TIME_LIMIT = 20;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
formatTimeLeft();