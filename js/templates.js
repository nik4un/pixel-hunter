const Answer = class {
  constructor(wasAnswer, timeAnswer, correctness) {
    this.wasAnswer = wasAnswer;
    this.timeAnswer = timeAnswer;
    this.correctness = correctness;
    this.continuation = true;
  }
};

export default Answer;
