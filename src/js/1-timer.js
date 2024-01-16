import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < new Date()) {
      document.querySelector('[data-start]').disabled = true;
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
    } else {
      document.querySelector('[data-start]').disabled = false;
    }
  },
};

document.addEventListener("DOMContentLoaded", function () {
  flatpickr("#datetime-picker", options);
});

document.querySelector("#datetime-picker").addEventListener("click", () => {
  flatpickr("#datetime-picker", options).open();
});

document.querySelector('[data-start]').addEventListener('click', startTimer);

function startTimer() {
  if (!userSelectedDate || userSelectedDate < new Date()) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a valid date before starting the timer',
    });
    return;
  }

  const countdownInterval = setInterval(updateTimer, 1000);

  function updateTimer() {
    const timeRemaining = userSelectedDate - new Date();
    if (timeRemaining <= 0) {
      clearInterval(countdownInterval);
      displayTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      document.querySelector('[data-start]').disabled = true;
    } else {
      const formattedTime = convertMs(timeRemaining);
      displayTime(formattedTime);
    }
  }

  function displayTime({ days, hours, minutes, seconds }) {
    document.querySelector('[data-days]').textContent = addLeadingZero(days);
    document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
    document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
    document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
  }
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}
