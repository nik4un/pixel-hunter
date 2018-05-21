import { BOOST_FACTOR } from "./data/constants";

const FailResult = class {
  constructor(stats) {
    this.grandTotal = `Проигрыш.`;
    this.stats = stats;
    this.bonuses = [];
    this.finalSum = `fail`;
    this.totalPoints = `fail`;
  }
};

const SuccessResult = class {
  constructor(stats, bonuses, totalPoints, finalSum) {
    this.grandTotal = `Победа!`;
    this.stats = stats;
    this.bonuses = bonuses;
    this.pointsFactor = BOOST_FACTOR.correct;
    this.finalSum = finalSum;
    this.totalPoints = totalPoints;
  }
};

const bonusName = {
  heart: `Бонус за жизни`,
  fast: `Бонус за скорость`,
  slow: `Штраф за медлительность`,
};

const Bonus = class {
  constructor(type, count) {
    this.shortName = type;
    this.name = bonusName[type];
    this.count = count;
    this.bonusFactor = BOOST_FACTOR[type];
    this.total = count * BOOST_FACTOR[type];
  }
};


const finalStats = () => {
  const { questionsCount, lives, statistics } = window.gameCourse;

  if (statistics.length === questionsCount) {
    const bonusOverview = {
      fast: 0,
      heart: lives,
      slow: 0,
    };
    let points = 0;
    const wrongFunc = () => true;
    const correctFanc = () => {
      points += 1;
    };
    const fastFunc = () => {
      points += 1;
      bonusOverview.fast += 1;
    };
    const slowFunc = () => {
      points += 1;
      bonusOverview.slow += 1;
    };
    const evaluateResults = {
      unknown: wrongFunc,
      wrong: wrongFunc,
      correct: correctFanc,
      fast: fastFunc,
      slow: slowFunc,
    };

    statistics.forEach((item) => evaluateResults[item]());

    const totalPoints = points * BOOST_FACTOR.correct;
    const gameBonuses = [];
    let finalSum = totalPoints;

    [...Object.keys(bonusOverview)].forEach((key) => {
      const element = bonusOverview[key];
      if (element > 0) {
        gameBonuses.push(new Bonus(key, element));
        finalSum += element * BOOST_FACTOR[key];
      }
    });

    return [new SuccessResult(statistics, gameBonuses, totalPoints, finalSum)];
  }
  return [new FailResult(statistics)];
};

export default finalStats;
