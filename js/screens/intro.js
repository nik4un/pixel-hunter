import createDomElement from '../create-dom-element';
import showScreen from '../showScreen';
import footer from './footer';
import greeting from './greeting';

export default () => {
  const block = `<div id="main" class="central__content">
    <div id="intro" class="intro">
      <h1 class="intro__asterisk">*</h1>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </div>
  </div>
  ${footer}`;

  const element = createDomElement(block);
  const asterisk = element.querySelector(`.intro__asterisk`);

  const onClickAsterisk = () => {
    showScreen(greeting());
  };

  asterisk.addEventListener(`click`, onClickAsterisk);
  return element;
};
