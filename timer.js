const timer_span = document.getElementById('base-timer-label')

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

let timeInterval = null;

function startTimer() {
    timeInterval = setInterval(() => {
        timePassed++;
        timeLeft = TIME_LIMIT - timePassed;
        timer_span.innerHTML = formatTimeLeft(timeLeft);
    }, 1000);
}
startTimer();