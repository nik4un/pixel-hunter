import createDomElement from "../create-dom-element";
import showScreen from "../showScreen";
import { headerNode, backToIntro, timer, gameLives } from './header';
import footer from "./footer";
import gameState from './game-state';
import statsScreen from './stats';
import { finalResult } from '../data/games';

export default (levelInit) => {
  const { lives, images, stats } = levelInit;
  const block = `
  <div class="game">
    <p class="game__task">Найдите рисунок среди изображений</p>
    <form class="game__content  game__content--triple">
      <div class="game__option" style="background-image: url(${images[0]})">
      </div>
      <div class="game__option  game__option--selected" style="background-image: url(${images[1]})">
      </div>
      <div class="game__option" style="background-image: url(${images[2]})">
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
  const formOptions = answer.querySelectorAll(`.game__option`);

  const onClickOpion = () => {
    statsScreen(finalResult);
  };

  [...formOptions].forEach((option) => {
    option.addEventListener(`click`, onClickOpion);
  });

  showScreen(header, element);
};
