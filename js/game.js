import { LIVES_COUNT, RESPONSE_SPEED } from './data/constants';
import { questions, attempts } from './data/questions';
import tinderLike from "./games/tinder-like";
import towOfTow from "./games/two-of-two";
import oneOfThree from "./games/one-of-three";
// import finalResult from "./data/games";
import showStats from "./screens/stats";
import finalStats from "./final-stats";

let gameQuestions = Array.from(questions);
let questionsCount = attempts;

export const gameCourse = {
  question: null,
  task: null,
  lives: LIVES_COUNT,
  stats: [],
};

const getLevel = {
  "tinder-like": tinderLike,
  "two-of-two": towOfTow,
  "one-of-three": oneOfThree,
};

const speedEvaluation = (timeAnswer) => {
  if (timeAnswer < RESPONSE_SPEED.fast) {
    gameCourse.stats.push(`fast`);
  } else if (timeAnswer > RESPONSE_SPEED.slow) {
    gameCourse.stats.push(`slow`);
  } else {
    gameCourse.stats.push(`correct`);
  }
};

export const resultAnalysis = (data) => {
  const { wasAnswer, timeAnswer, correctness } = data;
  if (wasAnswer) {
    if (correctness) {
      speedEvaluation(timeAnswer);
    } else {
      gameCourse.stats.push(`wrong`);
      gameCourse.lives -= 1;
    }
  } else {
    gameCourse.stats.push(`unknown`);
    gameCourse.lives -= 1;
  }
};

const game = (init) => {
  const onStageEnd = (data) => {
    const { continuation } = data;
    if (data) {
      resultAnalysis(data);
    }
    if (continuation) {
      game();
    }
  };

  if (init) {
    gameCourse.question = null;
    gameCourse.task = null;
    gameCourse.lives = LIVES_COUNT;
    gameCourse.stats = [];
    gameQuestions = Array.from(questions);
    questionsCount = attempts;
  }
  if (questionsCount > 0 && gameCourse.lives > 0) {
    const currentQuest = gameQuestions.shift();
    questionsCount = gameQuestions.length;
    gameCourse.question = currentQuest.question;
    gameCourse.task = currentQuest.answers;
    getLevel[currentQuest.type](gameCourse, onStageEnd);
  } else {
    const gameResult = {
      lives: gameCourse.lives,
      stats: gameCourse.stats,
    };
    const result = finalStats(gameResult);
    showStats(result);
  }
};

export default game;
