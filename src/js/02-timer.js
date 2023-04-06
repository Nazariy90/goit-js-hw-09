import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
const startBTN = document.querySelector('button[data-start]');
startBTN.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBTN.disabled = true;
    } else {
      startBTN.disabled = false;
      timer.deadline = selectedDates[0];
    }
  },
};
flatpickr('#datetime-picker', options);

const timer = {
  intervalId: null,

  start() {
    const timerValues = Array.from(document.querySelectorAll('.value'));
    this.intervalId = setInterval(() => {
      const ms = this.deadline - Date.now();

      if (ms <= 0) {
        this.stop();
        return;
      }

      const { days, hours, minutes, seconds } = this.convertMs(ms);
      const values = [days, hours, minutes, seconds];
      values.forEach((value, index) => {
        timerValues[index].textContent = this.addLeadingZero(value);
      });
    }, 1000);
  },

  stop() {
    clearInterval(this.intervalId);
  },

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    return { days, hours, minutes, seconds };
  },

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  },
};

startBTN.addEventListener('click', timer.start.bind(timer));
