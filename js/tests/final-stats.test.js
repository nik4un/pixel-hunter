import chai from "chai";
import finalStats from "../final-stats";


const { assert } = chai;

describe(`Финальная статистика`, () => {
  describe(`Победа - Проигрыш`, () => {
    it(`Проигрыш: ответов 6 из 10, жизней 0`, () => {
      const data = {
        stats: [`wrong`, `slow`, `fast`, `wrong`, `correct`, `wrong`],
        lives: 0,
        questionsCount: 10,
      };
      assert.propertyVal(finalStats(data, data.questionsCount), `grandTotal`, `Проигрыш.`);
    });

    it(`Победа: ответов 10 из 10, жизней 0`, () => {
      const data = {
        stats: [`wrong`, `slow`, `fast`, `wrong`, `correct`, `slow`, `fast`, `correct`, `slow`, `wrong`],
        lives: 0,
        questionsCount: 10,
      };
      console.log(`Log: ${finalStats(data, data.questionsCount).grandTotal}`);

      assert.propertyVal(finalStats(data, data.questionsCount), `grandTotal`, `Победа!`);
    });
  });

  describe(`Проигрыш. Баллы `, () => {
    it(`Поражение: ответов 5 из 10, жизней 0`, () => {
      const data = {
        stats: [`wrong`, `slow`, `fast`, `wrong`, `wrong`],
        lives: 0,
        questionsCount: 10,
      };
      assert.propertyVal(finalStats(data, data.questionsCount), `finalSum`, `fail`);
      assert.propertyVal(finalStats(data, data.questionsCount), `totalPoints`, `fail`);
    });
  });


  describe(`Победа. Баллы `, () => {
    it(`Победа: ответов 10 из 10, жизней 0`, () => {
      const data = {
        stats: [`wrong`, `slow`, `fast`, `wrong`, `correct`, `slow`, `fast`, `correct`, `slow`, `wrong`],
        lives: 0,
        questionsCount: 10,
      };
      assert.propertyVal(finalStats(data, data.questionsCount), `totalPoints`, 700);
      assert.propertyVal(finalStats(data, data.questionsCount), `finalSum`, 650);
    });

    it(`Победа: ответов 10 из 10, жизней 1 из 3`, () => {
      const data = {
        stats: [`wrong`, `slow`, `fast`, `fast`, `correct`, `wrong`, `fast`, `correct`, `slow`, `correct`],
        lives: 1,
        questionsCount: 10,
      };
      assert.propertyVal(finalStats(data, data.questionsCount), `totalPoints`, 800);
      assert.propertyVal(finalStats(data, data.questionsCount), `finalSum`, 900);
    });

    it(`Победа: ответов 10 из 10, жизней 2 из 3`, () => {
      const data = {
        stats: [`wrong`, `slow`, `slow`, `fast`, `correct`, `fast`, `correct`, `slow`, `fast`, `correct`],
        lives: 2,
        questionsCount: 10,
      };
      assert.propertyVal(finalStats(data, data.questionsCount), `totalPoints`, 900);
      assert.propertyVal(finalStats(data, data.questionsCount), `finalSum`, 1000);
    });
  });
});
