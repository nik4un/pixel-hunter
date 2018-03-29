import createDomElement from "../create-dom-element";
import showScreen from "../showScreen";
import { headerNode, backToIntro } from './header';
import footer from "./footer";
import game1 from "./game1";
import { gameInit } from '../data/games';

export default (gameRules) => {
  const { attempts, maxFailAttempts, attemptTime: { value: responseTime, unit } } = gameRules;

  const block = `
  <div class="rules">
    <h1 class="rules__title">Правила</h1>
    <p class="rules__description">Угадай ${attempts} раз для каждого изображения фото <img
      src="img/photo_icon.png" width="16" height="16"> или рисунок <img
      src="img/paint_icon.png" width="16" height="16" alt="">.<br>
      Фотографиями или рисунками могут быть оба изображения.<br>
      На каждую попытку отводится ${responseTime} ${unit}.<br>
      Ошибиться можно не более ${maxFailAttempts} раз.<br>
      <br>
      Готовы?
    </p>
    <form class="rules__form">
      <input class="rules__input" type="text" placeholder="Ваше Имя">
      <button class="rules__button  continue" type="submit" disabled>Go!</button>
    </form>
  </div>
${footer}`;

  const header = headerNode(backToIntro());
  const element = createDomElement(block);
  const goingBtn = element.querySelector(`[type="submit"]`);
  const nameImput = element.querySelector(`form input`);

  const onImput = () => {
    if (nameImput.value.trim() === ``) {
      goingBtn.disabled = true;
    } else {
      goingBtn.disabled = false;
    }
  };

  const onClickGoingBtn = (evt) => {
    game1(gameInit[0]);
    evt.preventDefault();
  };

  nameImput.addEventListener(`input`, onImput);
  goingBtn.addEventListener(`click`, onClickGoingBtn);

  showScreen(header, element);
};
