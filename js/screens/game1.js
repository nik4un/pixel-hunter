import createDomElement from "../create-dom-element";
import showScreen from "../showScreen";
import { headerNode, backToIntro, timer, gameLives } from './header';
import footer from "./footer";
import gameState from './game-state';
import game2 from './game2';
import { gameInit } from '../data/games';

export default (levelInit) => {
  const { lives, images, stats } = levelInit;
  const block = `
  <div class="game">
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">
      <div class="game__option" style="background-image: url(${images[0]})">
        <label class="game__answer game__answer--photo">
          <input name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
      <div class="game__option" style="background-image: url(${images[1]})">
        <label class="game__answer  game__answer--photo">
          <input name="question2" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input name="question2" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
    <div class="stats">
      <ul class="stats">
        ${gameState(stats)}
      </ul>
    </div>
  </div>
${footer}`;


  const headerContent = [backToIntro(), timer(), gameLives(lives)];
  const header = headerNode(...headerContent);
  const element = createDomElement(block);
  const answer = element.querySelector(`form`);

  const onChangeAnswer = () => {
    if (answer.querySelector(`[name="question1"]:checked`) && answer.querySelector(`[name="question2"]:checked`)) {
      game2(gameInit[1]);
    }
  };

  answer.addEventListener(`change`, onChangeAnswer);

  showScreen(header, element);
};
