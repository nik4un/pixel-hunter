// import { attempts } from "../data/questions";

const attempts = 10;

export default (data) => {
  const arr = Array.from(data);
  const tail = new Array(attempts);
  tail.fill(`unknown`);
  arr.push(...tail);
  const newArr = arr.slice(0, attempts);
  return `<ul class="stats">
    ${newArr.map((item) => `<li class="stats__result stats__result--${item}"></li>`).join(``)}
  </ul>`;
};
