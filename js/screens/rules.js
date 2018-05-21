import createDomElement from "../create-dom-element";
import showScreen from "../showScreen";
import { headerNode, backToIntro } from './header';
import footer from "./footer";
import { LIVES_COUNT, GAME_DURATION } from "../data/constants";
import app from "../main";
import { getCorrectForm } from "../utilites";

export default () => {
  const attempts = window.gameCourse.questionsCount;
  const block = `
  <div class="rules">
    <h1 class="rules__title">Правила</h1>
    <p class="rules__description">Угадай ${attempts} ${
  getCorrectForm(attempts, [`раз`, `раза`, `раз`])} для каждого изображения фото <img
      src="img/photo_icon.png" width="16" height="16"> или рисунок <img
      src="img/paint_icon.png" width="16" height="16" alt="">.<br>
      Фотографиями или рисунками могут быть оба изображения.<br>
      На каждую попытку отводится ${GAME_DURATION} ${
  getCorrectForm(GAME_DURATION, [`секунда`, `секунды`, `секунд`])}.<br>
      Ошибиться можно не более ${LIVES_COUNT} ${
  getCorrectForm(LIVES_COUNT, [`раза`, `раз`, `раз`])}.<br>
      <br>
      Готовы?
    </p>
    <form class="rules__form">
      <input class="rules__input" type="text" placeholder="Ваше Имя" value="${window.gameCourse.gamerName}">
      <button class="rules__button  continue" type="submit" disabled>Go!</button>
    </form>
  </div>
${footer}`;

  const header = headerNode(backToIntro());
  const element = createDomElement(block);
  const goingBtn = element.querySelector(`[type="submit"]`);
  const nameImput = element.querySelector(`form input`);

  if (nameImput.value !== ``) {
    goingBtn.disabled = false;
  }

  const onImput = () => {
    if (nameImput.value.trim() === ``) {
      goingBtn.disabled = true;
    } else {
      goingBtn.disabled = false;
    }
  };

  const onClickGoingBtn = (evt) => {
    evt.preventDefault();
    window.gameCourse.gamerName = nameImput.value;
    window.gameCourse.init();
    app.showGame();
  };

  nameImput.addEventListener(`input`, onImput);
  goingBtn.addEventListener(`click`, onClickGoingBtn);
  showScreen(header, element);
};
