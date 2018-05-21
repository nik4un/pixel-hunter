import createDomElement from "../create-dom-element";
import showScreen from "../showScreen";
import { headerNode, backToIntro, timer, gameLives } from '../screens/header';
import footer from "../screens/footer";
import setTimer from "../timer";
import gameState from "../screens/game-state";
import { Answer, addImage } from "../game";

export default (gameOption, func) => {
  const {
    task, lives, stats, question,
  } = gameOption;
  const images = [];
  const relationsHW = [];
  const types = [];
  task.forEach((el) => {
    const { image, type } = el;
    images.push(image.url);
    relationsHW.push(image.height / image.width);
    types.push(type);
  });
  const block = `
  <div class="game">
    <p class="game__task">${question}</p>
    <form class="game__content  game__content--wide">
    ${images.map((el, i) => `
    <div class="game__option" value="${i}">
      <label class="game__answer  game__answer--photo">
        <input name="${i}" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer  game__answer--wide  game__answer--paint">
        <input name="${i}" type="radio" value="painting">
        <span>Рисунок</span>
      </label>
    </div>`).join(``)}
    </form>
    <div class="stats">
      <ul class="stats">
        ${gameState(stats)}
      </ul>
    </div>
  </div>
${footer}`;

  const userAnswer = new Answer(null, null, null);

  const comeback = () => {
    userAnswer.continuation = false;
  };

  const headerContent = [backToIntro(comeback), timer(), gameLives(lives)];
  const header = headerNode(...headerContent);
  const element = createDomElement(block);
  const answer = element.querySelector(`form`);
  const answers = answer.querySelectorAll(`.game__option`);

  [...answers].forEach((option) => {
    addImage(option, relationsHW[option.getAttribute(`value`)], window.gameCourse.imagesForGame[images[option.getAttribute(`value`)]]);
  });

  const onChangeAnswer = () => {
    const allSelected = [...answers].reduce((result, el, i) => {
      const predict = answer.querySelector(`[name="${i}"]:checked`);
      return result && predict;
    }, true);
    if (allSelected) {
      userAnswer.correctness = [...answers].reduce((result, el, i) => {
        const predict = el.querySelector(`[name]:checked`).value === types[i];
        return result && predict;
      }, true);

      const event = new CustomEvent(`stopTimer`);
      document.dispatchEvent(event);
      answer.removeEventListener(`change`, onChangeAnswer);
    }
  };

  const onStopGame = (evt) => {
    document.removeEventListener(`stopGame`, onStopGame);
    if (evt.detail.wasAnswer) {
      userAnswer.wasAnswer = true;
      userAnswer.timeAnswer = evt.detail.time;
    } else {
      userAnswer.wasAnswer = false;
      userAnswer.timeAnswer = evt.detail.time;
      userAnswer.correctness = false;
    }

    if (func) {
      func(userAnswer);
    }
  };

  answer.addEventListener(`change`, onChangeAnswer);
  document.addEventListener(`stopGame`, onStopGame);

  showScreen(header, element);
  setTimer();
};
