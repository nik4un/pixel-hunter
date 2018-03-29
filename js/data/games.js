export const gameInit = [
  {
    kindeOfGame: 1,
    lives: 3,
    images: [`https://k37.kn3.net/51254FE87.jpg`, `https://k41.kn3.net/CF684A85A.jpg`],
    stats: [`wrong`, `slow`, `fast`, `unknown`, `correct`],
    gameResult: `wrong`,
  },
  {
    kindeOfGame: 2,
    lives: 2,
    images: [`https://k41.kn3.net/FF5009BF0.jpg`],
    stats: [`wrong`, `slow`, `fast`, `correct`, `unknown`, `wrong`, `slow`],
    gameResult: `unknown`,
  },
  {
    kindeOfGame: 3,
    lives: 1,
    images: [`https://k43.kn3.net/9189AF8D2.jpg`, `https://k36.kn3.net/E9B401148.jpg`, `https://k43.kn3.net/1C4F7F5D5.jpg`],
    stats: [`wrong`, `slow`, `fast`, `correct`, `unknown`, `wrong`, `slow`, `unknown`, `fast`],
    gameResult: `correct`,
  },
];

export const finalResult = [
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
