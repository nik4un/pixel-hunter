import chai from "chai";
import finalStats from "../final-stats";


const { assert } = chai;


describe(`Финальная статистика`, () => {
  describe(`Победа - Проигрыш`, () => {
    it(`Проигрыш: ответов 6 из 10, жизней 0`, () => {
      const data = {
        statistics: [`wrong`, `slow`, `fast`, `wrong`, `correct`, `wrong`],
        lives: 0,
        questionsCount: 10,
      };
      assert.propertyVal(finalStats(data)[0], `grandTotal`, `Проигрыш.`);
    });

    it(`Победа: ответов 10 из 10, жизней 0`, () => {
      const data = {
        statistics: [`wrong`, `slow`, `fast`, `wrong`, `correct`, `slow`, `fast`, `correct`, `slow`, `wrong`],
        lives: 0,
        questionsCount: 10,
      };
      assert.propertyVal(finalStats(data)[0], `grandTotal`, `Победа!`);
    });
  });

  describe(`Проигрыш. Баллы `, () => {
    it(`Поражение: ответов 5 из 10, жизней 0`, () => {
      const data = {
        statistics: [`wrong`, `slow`, `fast`, `wrong`, `wrong`],
        lives: 0,
        questionsCount: 10,
      };
      assert.propertyVal(finalStats(data)[0], `finalSum`, `fail`);
      assert.propertyVal(finalStats(data)[0], `totalPoints`, `fail`);
    });
  });


  describe(`Победа. Баллы `, () => {
    it(`Победа: ответов 10 из 10, жизней 0`, () => {
      const data = {
        statistics: [`wrong`, `slow`, `fast`, `wrong`, `correct`, `slow`, `fast`, `correct`, `slow`, `wrong`],
        lives: 0,
        questionsCount: 10,
      };
      assert.propertyVal(finalStats(data)[0], `totalPoints`, 700);
      assert.propertyVal(finalStats(data)[0], `finalSum`, 650);
    });

    it(`Победа: ответов 6 из 6, жизней 1 из 3`, () => {
      const data = {
        statistics: [`wrong`, `slow`, `fast`, `fast`, `correct`, `wrong`],
        lives: 1,
        questionsCount: 6,
      };
      assert.propertyVal(finalStats(data)[0], `totalPoints`, 400);
      assert.propertyVal(finalStats(data)[0], `finalSum`, 500);
    });

    it(`Победа: ответов 6 из 6, жизней 2 из 3`, () => {
      const data = {
        statistics: [`wrong`, `slow`, `slow`, `fast`, `correct`, `fast`],
        lives: 2,
        questionsCount: 6,
      };
      assert.propertyVal(finalStats(data)[0], `totalPoints`, 500);
      assert.propertyVal(finalStats(data)[0], `finalSum`, 600);
    });
  });
});
