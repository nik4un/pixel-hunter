import { LIVES_COUNT } from './data/constants';
import Loader from './data/server-data';
import { preloadImages, getImages } from './images';
import intro from './screens/intro';
import greeting from './screens/greeting';
import rules from './screens/rules';
import { game } from './game';
import statistic from './screens/stats';
import finalStats from "./final-stats";

class InitialGame {
  constructor() {
    this.gameQuestions = [];
    this.imagesForGame = {};
    this.gamerName = ``;
  }
  init() {
    this.level = 0;
    this.lives = LIVES_COUNT;
    this.statistics = [];
  }
  get questionsCount() {
    return this.gameQuestions.length;
  }
}

const ControllerId = {
  INTRO: ``,
  GREETING: `greeting`,
  RULES: `rules`,
  GAME: `game`,
  STATISTIC: `statistic`,
};

const getHashControllerId = (hash) => {
  const hashValue = hash.replace(`#`, ``);
  const hashParams = hashValue.split(`=`);
  return hashParams ? hashParams[0] : hashValue;
};

window.gameCourse = new InitialGame();

const newGame = () => {
  window.gameCourse.init();
  game();
};

const getStatistic = () => {
  const data = {
    stats: window.gameCourse.statistics,
    lives: window.gameCourse.lives,
  };

  Loader.saveResults(data, window.gameCourse.gamerName)
    .then((response) => {
      if (response.ok) {
        Loader.loadResults(window.gameCourse.gamerName)
          .then((result) => {
            const serverStats = Array.from(result);
            serverStats.sort(((a, b) => b.date - a.date));
            const res = serverStats.map((item) =>
              finalStats(item, window.gameCourse.questionsCount)).splice(0, 4);
            statistic(res);
          });
      }
    })
    .catch((err) => console.log(`Ошибка загрузки статистики: ${err}`));
};

class App {
  constructor() {
    this.ControllerId = {
      INTRO: ``,
      GREETING: `greeting`,
      RULES: `rules`,
      GAME: `game`,
      STATISTIC: `statistic`,
    };

    this.routes = {
      [ControllerId.INTRO]: intro,
      [ControllerId.GREETING]: greeting,
      [ControllerId.RULES]: rules,
      [ControllerId.GAME]: newGame,
      [ControllerId.STATISTIC]: getStatistic,
    };

    const onHashchange = () => {
      this.changeController(getHashControllerId(window.location.hash));
    };

    window.addEventListener(`hashchange`, onHashchange, false);

    Loader.loadData()
      .then((result) => {
        window.gameCourse.gameQuestions = result;
        const allGameImages = getImages(result);
        return preloadImages(allGameImages);
      })
      .then((arr) => {
        arr.forEach((el) => {
          const [url, image] = el;
          window.gameCourse.imagesForGame[url] = image;
        });
        this.showIntro();
        this.init();
      });
  }

  init() {
    this.changeController(getHashControllerId(window.location.hash));
  }

  changeController(route = ``) {
    try {
      return this.routes[route]();
    } catch (e) {
      throw new Error(`Wrong Controller`);
    }
  }

  showIntro() {
    window.location.hash = this.ControllerId.INTRO;
  }

  showGreeting() {
    window.location.hash = this.ControllerId.GREETING;
  }

  showRules() {
    window.location.hash = this.ControllerId.RULES;
  }

  showGame() {
    window.location.hash = this.ControllerId.GAME;
  }

  showStatistic() {
    window.location.hash = this.ControllerId.STATISTIC;
  }
}

const app = new App();

export default app;
