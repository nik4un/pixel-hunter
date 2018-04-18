import chai from "chai";
import finalStats from "../final-stats";


const { assert } = chai;


describe(`Финальная статистика`, () => {
  describe(`Победа - Проигрыш`, () => {
    it(`Победа: ответов 6 из 6, жизней 0 из 3`, () => {
      const data = { stats: [`wrong`, `slow`, `fast`, `unknown`, `correct`, `wrong`], lives: 0 };
      assert.propertyVal(finalStats(data)[0], `grandTotal`, `Победа!`);
    });

    it(`Поражение: ответов 5 из 6, жизней 0`, () => {
      const data = { stats: [`wrong`, `slow`, `fast`, `unknown`, `wrong`], lives: 0 };
      assert.propertyVal(finalStats(data)[0], `grandTotal`, `Проигрыш.`);
    });
  });

  describe(`Проигрыш. Баллы `, () => {
    it(`Поражение: ответов 5 из 6, жизней 0 из 3`, () => {
      const data = { stats: [`wrong`, `slow`, `fast`, `unknown`, `wrong`], lives: 0 };
      assert.propertyVal(finalStats(data)[0], `finalSum`, `fail`);
      assert.propertyVal(finalStats(data)[0], `totalPoints`, `fail`);
    });
  });


  describe(`Победа. Баллы `, () => {
    it(`Победа: ответов 6 из 6, жизней 0 из 3`, () => {
      const data = { stats: [`wrong`, `slow`, `fast`, `unknown`, `correct`, `wrong`], lives: 0 };
      assert.propertyVal(finalStats(data)[0], `totalPoints`, 300);
      assert.propertyVal(finalStats(data)[0], `finalSum`, 300);
    });

    it(`Победа: ответов 6 из 6, жизней 1 из 3`, () => {
      const data = { stats: [`wrong`, `slow`, `fast`, `fast`, `correct`, `wrong`], lives: 1 };
      assert.propertyVal(finalStats(data)[0], `totalPoints`, 400);
      assert.propertyVal(finalStats(data)[0], `finalSum`, 500);
    });

    it(`Победа: ответов 6 из 6, жизней 2 из 3`, () => {
      const data = { stats: [`wrong`, `slow`, `slow`, `fast`, `correct`, `fast`], lives: 2 };
      assert.propertyVal(finalStats(data)[0], `totalPoints`, 500);
      assert.propertyVal(finalStats(data)[0], `finalSum`, 600);
    });
  });
});
