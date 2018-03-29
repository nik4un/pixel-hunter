export default {
  attempts: 10,
  maxFailAttempts: 3,
  attemptTime: {
    value: 30,
    unit: `секунд`,
  },
  totalFactor: 50,
  fastFactor: 50,
  slowFactor: 50,
  heartFactor: 50,
};
