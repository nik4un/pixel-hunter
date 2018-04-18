import createDomElement from "../create-dom-element";
import showScreen from "../showScreen";
import {
  headerNode,
  backToIntro,
  timer,
  gameLives,
} from '../screens/header';
import footer from "../screens/footer";
import setTimer from "../timer";
import gameState from "../screens/game-state";
import Answer from "../templates";

export default (gameOption, func) => {
  const {
    task,
    lives,
    stats,
    question,
  } = gameOption;
  const images = [];
  const types = [];

  const detectionTask = {
    "Найдите рисунок среди изображений": `painting`,
    "Найдите фото среди изображений": `photo`,
  };

  task.forEach((el) => {
    const {
      image,
      type,
    } = el;
    images.push(image.url);
    types.push(type);
  });
  const block = `
  <div class="game">
    <p class="game__task">${question}</p>
    <form class="game__content  game__content--triple">
    ${images.map((el, i) =>
    `<div class="game__option" value="${i}" style="background-image: url(${el})"></div>`).join(``)}
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
  const formOptions = answer.querySelectorAll(`.game__option`);

  const onClickOpion = (evt) => {
    const choice = +evt.target.attributes.value.nodeValue;

    userAnswer.correctness = types[choice] === detectionTask[question];

    const event = new CustomEvent(`stopTimer`);
    document.dispatchEvent(event);
    [...formOptions].forEach((option) => {
      option.removeEventListener(`click`, onClickOpion);
    });
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

  [...formOptions].forEach((option) => {
    option.addEventListener(`click`, onClickOpion);
  });
  document.addEventListener(`stopGame`, onStopGame);

  showScreen(header, element);
  setTimer();
};
