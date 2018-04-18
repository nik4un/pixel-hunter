import createDomElement from "../create-dom-element";
import showScreen from "../showScreen";
import { headerNode, backToIntro, timer, gameLives } from '../screens/header';
import footer from "../screens/footer";
import setTimer from "../timer";
import gameState from "../screens/game-state";
import Answer from "../templates";

export default (gameOption, func) => {
  const {
    task, lives, stats, question,
  } = gameOption;
  const images = [];
  const types = [];
  task.forEach((el) => {
    const { image, type } = el;
    images.push(image.url);
    types.push(type);
  });
  // console.log(images, types);
  const block = `
  <div class="game">
    <p class="game__task">${question}</p>
    <form class="game__content  game__content--wide">
    ${images.map((el, i) => `
    <div class="game__option" style="background-image: url(${el})">
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

  const onChangeAnswer = () => {
    const allSelected = [...answers].reduce((result, el, i) => {
      const predict = answer.querySelector(`[name="${i}"]:checked`);
      // console.log(`predict: ${!!predict}`);
      return result && predict;
    }, true);
    // console.log(`allSelected: ${!!allSelected}`);
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
      console.log(`Игрок оветил спустя ${userAnswer.timeAnswer} сек. ${userAnswer.correctness}`);
    } else {
      userAnswer.wasAnswer = false;
      userAnswer.timeAnswer = evt.detail.time;
      userAnswer.correctness = false;
      console.log(`Время на ответ истекло. Прошло ${userAnswer.timeAnswer} сек.`);
    }

    console.log(userAnswer);

    if (func) {
      func(userAnswer);
    }

    // game2(gameInit[1]);
  };

  answer.addEventListener(`change`, onChangeAnswer);
  document.addEventListener(`stopGame`, onStopGame);

  showScreen(header, element);
  setTimer();
};
