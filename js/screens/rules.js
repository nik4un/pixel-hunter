import createDomElement from "../create-dom-element";
import showScreen from "../showScreen";
import footer from "./footer";
import game1 from './game1';
import intro from "./intro";

export default () => {
  const block = `<header class="header">
    <div class="header__back">
      <span class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.png" width="101" height="44">
      </span>
    </div>
  </header>
  <div class="rules">
    <h1 class="rules__title">Правила</h1>
    <p class="rules__description">Угадай 10 раз для каждого изображения фото <img
      src="img/photo_icon.png" width="16" height="16"> или рисунок <img
      src="img/paint_icon.png" width="16" height="16" alt="">.<br>
      Фотографиями или рисунками могут быть оба изображения.<br>
      На каждую попытку отводится 30 секунд.<br>
      Ошибиться можно не более 3 раз.<br>
      <br>
      Готовы?
    </p>
    <form class="rules__form">
      <input class="rules__input" type="text" placeholder="Ваше Имя">
      <button class="rules__button  continue" type="submit" disabled>Go!</button>
    </form>
  </div>
${footer}`;

  const element = createDomElement(block);
  const goingBtn = element.querySelector(`[type="submit"]`);
  const nameImput = element.querySelector(`form input`);
  const returnBtn = element.querySelector(`.header__back`);

  const onImput = () => {
    if (nameImput.value.trim() === ``) {
      goingBtn.disabled = true;
    } else {
      goingBtn.disabled = false;
    }
  };

  const onClickGoingBtn = (evt) => {
    showScreen(game1());
    evt.preventDefault();
  };

  const onClickReturnBtn = () => {
    showScreen(intro());
  };

  nameImput.addEventListener(`input`, onImput);
  goingBtn.addEventListener(`click`, onClickGoingBtn);
  returnBtn.addEventListener(`click`, onClickReturnBtn);

  return element;
};
