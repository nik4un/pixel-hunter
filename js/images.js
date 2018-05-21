// Промисы длля загрузки изображений

export const preloadImage = (url) => new Promise((resolve) => {
  const img = new Image();
  img.addEventListener(`load`, () => {
    resolve([img.src, img]);
  });
  img.src = url;
});

export const preloadImages = (images) => Promise.all(images.map(preloadImage));

export const getImages = (questions) => {
  const allGameImages = [];
  questions.forEach((question) => {
    question.answers.forEach(({ image }) => {
      allGameImages.push(image.url);
    });
  });

  return allGameImages;
};
