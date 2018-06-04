import chai from "chai";
import assertArrays from "chai-arrays";
import { getRandomFromArray, getCorrectForm } from "../utilites";

const { assert } = chai;

describe(`getRandomFromArray`, () => {
  const arr = [1, 2, 3, 4, 5];
  describe(`Длинна результирующего массива`, () => {
    it(`num < длины исходного`, () => {
      assert.
        lengthOf(getRandomFromArray(arr, 3), 3, /Длинна результирующего массива должна быть 3/);
    });
    it(`num > длины исходного`, () => {
      assert.
        lengthOf(getRandomFromArray(arr, 7), 5, /Длинна результирующего массива должна быть 5/);
    });
    it(`num отсутствует`, () => {
      assert.
        lengthOf(getRandomFromArray(arr), 5, /Длинна результирующего массива должна быть 5/);
    });
    it(`arr & num отсутствуют`, () => {
      assert.lengthOf(getRandomFromArray(), 0, /Длинна результирующего массива должна быть 0/);
    });

    describe(`Результирующий массив должен содержать элементы исходного`, () => {
      it(`по всему диапазону`, () => {
        chai.use(assertArrays).expect(arr).to.be.containingAllOf(getRandomFromArray(arr));
      });
      it(`не полный диапазон`, () => {
        chai.use(assertArrays).expect(arr).to.be.containingAllOf(getRandomFromArray(arr, 3));
      });
    });
  });

  describe(`getCorrectForm [Правильное склонение]`, () => {
    const forms = [`секунда`, `секунды`, `секунд`];
    describe(`Формы заданы`, () => {
      it(`1`, () => {
        assert.equal(getCorrectForm(1, forms), `секунда`, /Должно быть "секунда"/);
      });
      it(`2`, () => {
        assert.equal(getCorrectForm(2, forms), `секунды`, /Должно быть "секунды"/);
      });
      it(`5`, () => {
        assert.equal(getCorrectForm(5, forms), `секунд`, /Должно быть "секунд"/);
      });
      it(`0`, () => {
        assert.equal(getCorrectForm(21, forms), `секунда`, /Должно быть "секунда"/);
      });
      it(`21`, () => {
        assert.equal(getCorrectForm(10, forms), `секунд`, /Должно быть "секунд"/);
      });
    });

    describe(`Формы не заданы`, () => {
      it(`1`, () => {
        assert.equal(getCorrectForm(1), `штука`, /Должно быть "штука"/);
      });
      it(`2`, () => {
        assert.equal(getCorrectForm(3), `штуки`, /Должно быть "штуки"/);
      });
      it(`5`, () => {
        assert.equal(getCorrectForm(6), `штук`, /Должно быть "штук"/);
      });
      it(`0`, () => {
        assert.equal(getCorrectForm(121), `штука`, /Должно быть "штука"/);
      });
      it(`21`, () => {
        assert.equal(getCorrectForm(0), `штук`, /Должно быть "штук"/);
      });
    });
  });
});
