export const questions = [
  {
    type: `tinder-like`,
    question: `Угадай, фото или рисунок?`,
    answers: [{
      image: {
        url: `https://k41.kn3.net/FF5009BF0.jpg`,
        width: 705,
        height: 455,
      },
      type: `painting`,
    }],
  },
  {
    type: `two-of-two`,
    question: `Угадайте для каждого изображения фото или рисунок?`,
    answers: [{
      image: {
        url: `https://k37.kn3.net/51254FE87.jpg`,
        width: 468,
        height: 458,
      },
      type: `painting`,
    }, {
      image: {
        url: `https://k41.kn3.net/CF684A85A.jpg`,
        width: 468,
        height: 458,
      },
      type: `painting`,
    }],
  },
  {
    type: `one-of-three`,
    question: `Найдите рисунок среди изображений`,
    answers: [{
      image: {
        url: `https://k43.kn3.net/9189AF8D2.jpg`,
        width: 304,
        height: 455,
      },
      type: `photo`,
    }, {
      image: {
        url: `https://k36.kn3.net/E9B401148.jpg`,
        width: 304,
        height: 455,
      },
      type: `photo`,
    }, {
      image: {
        url: `https://k43.kn3.net/1C4F7F5D5.jpg`,
        width: 304,
        height: 455,
      },
      type: `painting`,
    }],
  },
];

export const attempts = questions.length;
