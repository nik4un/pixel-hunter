import createDomElement from "../create-dom-element";
import showScreen from "../showScreen";
import footer from "./footer";
import gameState from "./game-state";
import { headerNode, backToIntro } from "./header";

export default (gameResult) => {
  const block = `
  <div class="result">
    <h1>${gameResult[0].grandTotal}</h1>
    ${gameResult
    .map((el, i) => {
      const {
        stats, pointsFactor, totalPoints, bonuses, finalSum,
      } = el;
      return `
      <table class="result__table">
        <tr>
          <td class="result__number">${i + 1}.</td>
          <td colspan="2">
            <ul class="stats">
              ${gameState(stats)}
            </ul>
          </td>
          <td class="result__points">×&nbsp;${finalSum === `fail` ? `` : pointsFactor}</td>
          <td class="result__total">${totalPoints}</td>
        </tr>
        ${bonuses.map((item) => {
    if (item) {
      const {
        name, shortName, count, bonusFactor, total,
      } = item;
      return `
        <tr>
          <td></td>
          <td class="result__extra">${name}:</td>
          <td class="result__extra">${count}&nbsp;<span class="stats__result stats__result--${shortName}"></span></td>
          <td class="result__points">×&nbsp;${Math.abs(bonusFactor)}</td>
          <td class="result__total">${total}</td>
        </tr>`;
    }
    return ``;
  }).join(``)}
        <tr>
          <td colspan="5" class="result__total  result__total--final">${finalSum}</td>
        </tr>
      </table>`;
    })
    .join(``)}
  </div>
${footer}`;

  const header = headerNode(backToIntro());
  const element = createDomElement(block);

  showScreen(header, element);
};
