import { RESPONSE_SPEED } from './data/constants';
import tinderLike from "./game-tasks/tinder-like";
import towOfTow from "./game-tasks/two-of-two";
import oneOfThree from "./game-tasks/one-of-three";
import app from "./main";

class Quest {
  constructor(task, lives, stats, question) {
    this.task = task;
    this.lives = lives;
    this.stats = stats;
    this.question = question;
  }
}

const getLevel = {
  "tinder-like": tinderLike,
  "two-of-two": towOfTow,
  "one-of-three": oneOfThree,
};

const speedEvaluation = (timeAnswer) => {
  if (timeAnswer < RESPONSE_SPEED.fast) {
    window.gameCourse.statistics.push(`fast`);
  } else if (timeAnswer > RESPONSE_SPEED.slow) {
    window.gameCourse.statistics.push(`slow`);
  } else {
    window.gameCourse.statistics.push(`correct`);
  }
};

export const resultAnalysis = (data) => {
  const { wasAnswer, timeAnswer, correctness } = data;
  if (wasAnswer) {
    if (correctness) {
      speedEvaluation(timeAnswer);
    } else {
      window.gameCourse.statistics.push(`wrong`);
      window.gameCourse.lives -= 1;
    }
  } else {
    window.gameCourse.statistics.push(`wrong`);
    window.gameCourse.lives -= 1;
  }
};

export const game = () => {
  const onStageEnd = (data) => {
    const { continuation } = data;
    if (data) {
      resultAnalysis(data);
    }
    if (continuation) {
      game();
    }
  };

  if (window.gameCourse.level < window.gameCourse.questionsCount
    && window.gameCourse.lives > 0) {
    const currentQuest = window.gameCourse.gameQuestions[window.gameCourse.level];
    window.gameCourse.level += 1;
    const quest = new Quest(
      currentQuest.answers,
      window.gameCourse.lives,
      window.gameCourse.statistics,
      currentQuest.question,
    );
    getLevel[currentQuest.type](quest, onStageEnd);
  } else {
    app.showStatistic();
  }
};

export const addImage = (node, nodeHW, image) => {
  const img = image;
  const theFirstChild = node.firstChild;
  const imageHW = image.naturalHeight / image.naturalWidth;
  if (nodeHW >= imageHW) {
    img.style.width = `100%`;
  } else {
    img.style.height = `100%`;
  }
  node.insertBefore(img, theFirstChild);
};

export const Answer = class {
  constructor(wasAnswer, timeAnswer, correctness) {
    this.wasAnswer = wasAnswer;
    this.timeAnswer = timeAnswer;
    this.correctness = correctness;
    this.continuation = true;
  }
};
