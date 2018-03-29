import createDomElement from "../create-dom-element";
import intro from "./intro";
import gameParam from "../data/rules";

const { maxFailAttempts, attemptTime: { value: responseTime } } = gameParam;

export const backToIntro = () => {
  const block = `<div class="header__back">
        <span class="back">
          <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
          <img src="img/logo_small.png" width="101" height="44">
        </span>
      </div>`;

  const element = createDomElement(block);
  element.querySelector(`.back`).addEventListener(`click`, () => {
    intro();
  });
  return element;
};

export const timer = () => {
  const block = `<h1 class="game__timer">${responseTime}</h1>`;
  const element = createDomElement(block);
  return element;
};

export const gameLives = (state) => {
  const block = `<div class="game__lives">
    ${new Array(maxFailAttempts - state)
    .fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`)
    .join(``)}
    ${new Array(state)
    .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`)
    .join(``)}
    </div>`;
  const element = createDomElement(block);
  return element;
};

const block = `<header class="header"></header>`;

export const headerNode = (...args) => {
  const container = createDomElement(block);
  if (args) {
    args.forEach((el) => container.appendChild(el));
  }
  return container;
};
