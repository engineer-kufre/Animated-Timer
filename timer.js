//cashing the DOM
const timer_span = document.getElementById('base-timer-label'); //for countdown
const progress_path = document.getElementById('base-timer-path-remaining'); //for path color animation

//calculate time left in minutes and seconds
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

const TIME_LIMIT = 62; //set timer duration
let timePassed = 0;
let timeLeft = TIME_LIMIT;
formatTimeLeft();

let timerInterval = null;

//timer count interval, display count, display color and dasharray. All resolved every 1 second
function startTimer() {
    timerInterval = setInterval(() => {
        timePassed++;
        timeLeft = TIME_LIMIT - timePassed;
        timer_span.innerHTML = formatTimeLeft(timeLeft);
        setRemainingPathColor();
        setCircleDasharray();
    }, 1000);
}
startTimer(); //ignition

//calculate fraction of time left
function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

const FULL_DASH_ARRAY = 283; //full dash array covers 360deg on the timer face

//calc the amount of circle dash array relative to fraction of time left
function setCircleDasharray() {
    const circleDasharray = `${(
        calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document
    .getElementById('base-timer-path-remaining')
    .setAttribute('stroke-dasharray', circleDasharray);
}

//set warning and alert thresholds as fractions of the initially set timer duration. Determines point of color change
const WARNING_THRESHOLD = TIME_LIMIT / 2;
const ALERT_THRESHOLD = TIME_LIMIT / 4;

//add and remove classes to change path color
function setRemainingPathColor() {
    if (timeLeft <= ALERT_THRESHOLD) {
        progress_path.classList.remove('warning');
        progress_path.classList.add('alert');
    } else if (timeLeft <= WARNING_THRESHOLD) {
        progress_path.classList.remove('info');
        progress_path.classList.add('warning');
    }
}
