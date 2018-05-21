import { GAME_DURATION, TIMER_IS_OVER_VALUE } from './data/constants';

const TIMER_CLASS_NAME = `game__timer`;
const TIMER_IS_OVER_CLASS_NAME = `game__timer-over`;

const Timer = class {
  constructor() {
    this.value = 0;
    this.timerId = null;
  }

  start(timerValue) {
    this.value = timerValue;
    this.timerId = setInterval(() => {
      this.value -= 1;
      const timerEvent = this.value > 0 ?
        new CustomEvent(`timerUpdate`, {
          detail: this.value,
        }) :
        new CustomEvent(`timeOver`);

      document.dispatchEvent(timerEvent);

      if (this.value <= 0) {
        clearInterval(this.timerId);
      }
    }, 1000);
  }

  stop(func) {
    clearInterval(this.timerId);
    if (func && typeof func === `function`) {
      func(this.value);
    }
    this.value = 0;
  }
};

export default () => {
  const parentTimer = document.querySelector(`.${TIMER_CLASS_NAME}`);

  const printTime = (value) => {
    if (parentTimer) {
      parentTimer.innerHTML = value;
    }

    if (value <= TIMER_IS_OVER_VALUE) {
      parentTimer.classList.add(TIMER_IS_OVER_CLASS_NAME);
    }
  };

  const onTimerUpdate = (evt) => printTime(evt.detail);

  const timer = new Timer();

  const onStopTimer = () => {
    document.removeEventListener(`timeOver`, onTimeOver);  // eslint-disable-line
    document.removeEventListener(`timerUpdate`, onTimerUpdate);
    document.removeEventListener(`stopTimer`, onStopTimer);
    timer.stop((arg) => {
      const event = new CustomEvent(`stopGame`, {
        detail: {
          wasAnswer: true,
          time: (GAME_DURATION - arg),
        },
      });
      document.dispatchEvent(event);
    });
  };

  const onTimeOver = () => {
    document.removeEventListener(`timeOver`, onTimeOver);
    document.removeEventListener(`timerUpdate`, onTimerUpdate);
    document.removeEventListener(`stopTimer`, onStopTimer);
    printTime(`0`);
    const event = new CustomEvent(`stopGame`, {
      detail: {
        wasAnswer: false,
        time: GAME_DURATION,
      },
    });
    document.dispatchEvent(event);
  };

  printTime(GAME_DURATION);
  timer.start(GAME_DURATION);
  document.addEventListener(`timerUpdate`, onTimerUpdate);
  document.addEventListener(`timeOver`, onTimeOver);
  document.addEventListener(`stopTimer`, onStopTimer);
};
