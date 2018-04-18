const finalResult = [
  {
    success: true,
    stats: [`wrong`, `slow`, `fast`, `unknown`, `correct`, `slow`, `fast`, `unknown`, `wrong`, `unknown`],
    pointsMultiply: 100,
    totalPoints: 900,
    bonus: [{
      name: `Бонус за скорость`,
      shortName: `fast`,
      count: 2,
      points: 50,
      total: 100,
    }, {
      name: `Бонус за жизни`,
      shortName: `heart`,
      count: 1,
      points: 50,
      total: 50,
    }, {
      name: `Штраф за медлительность`,
      shortName: `slow`,
      count: 2,
      points: 50,
      total: `-100`,
    }],
    finalSum: 950,
  },
  {
    success: false,
    pointsMultiply: ``,
    totalPoints: `fail`,
    stats: [`wrong`, `slow`, `fast`, `unknown`, `correct`, `slow`, `fast`, `wrong`, `unknown`, `wrong`],
    finalSum: `fail`,
    bonus: [],
  },
  {
    success: true,
    pointsMultiply: 100,
    totalPoints: 900,
    stats: [`wrong`, `slow`, `fast`, `unknown`, `correct`, `slow`, `fast`, `correct`, `unknown`, `correct`],
    total: 9,
    bonus: [{
      name: `Бонус за жизни`,
      shortName: `heart`,
      count: 2,
      points: 50,
      total: 100,
    }],
    finalSum: 1000,
  },
];

export default finalResult;
