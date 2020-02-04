const timer_span = document.getElementById('base-timer-label');
const progress_path = document.getElementById('base-timer-path-remaining');

function formatTimeLeft() {
    if (timeLeft >= 0) {
       const minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        return `${minutes}:${seconds}`; 
    } else return `0:00`;
    
}

const TIME_LIMIT = 21;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
formatTimeLeft();

let timerInterval = null;

function startTimer() {
    timerInterval = setInterval(() => {
        timePassed++;
        timeLeft = TIME_LIMIT - timePassed;
        timer_span.innerHTML = formatTimeLeft(timeLeft);

        setCircleDasharray();
    }, 1000);
}
startTimer();

function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

const FULL_DASH_ARRAY = 283;

function setCircleDasharray() {
    const circleDasharray = `${(
        calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document
    .getElementById('base-timer-path-remaining')
    .setAttribute('stroke-dasharray', circleDasharray);
}

const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

function setRemainingPathColor(timeLeft) {
    if (timeLeft <= ALERT_THRESHOLD) {
        progress_path.classList.remove('warning');
        progress_path.classList.add('alert');
    } else if (timeLeft <= WARNING_THRESHOLD) {
        progress_path.classList.remove('info');
        progress_path.classList.add('warning');
    }
}
setRemainingPathColor();