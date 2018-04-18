/**
 * получение мссива из num случайных элементов массива arr
 * @param  {Array} arr  исходный массив
 * @param  {Number} num количество элементов результирующего массива (<= arr.length)
 * @return {Array}      массив из случайных элементов исходного массива
 */
export const getRandomFromArray = (arr = [], num = arr.length) => {
  const internalArr = Array.from(arr);
  const itemCount = (num > arr.length) ? arr.length : num;
  const resultArr = [];
  for (let i = 0; i < itemCount; i += 1) {
    const [item] = internalArr.splice(Math.floor(Math.random() * internalArr.length), 1);
    resultArr[i] = item;
  }
  return resultArr;
};

/**
 * получение правильной формы числительного
 * @param  {Number} num   порядковое числительное
 * @param  {Array}  forms массив форм числительного для 1, 2, 5
 * @return {String}       правильной формы числительного
 */
export const getCorrectForm = (number = 1, forms = [`штука`, `штуки`, `штук`]) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return forms[(number % 100 > 4 && number % 100 < 20) ?
    2 : cases[(number % 10 < 5) ?
      number % 10 : 5]];
};
