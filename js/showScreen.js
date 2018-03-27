const root = document.querySelector(`.central`);

export default (elem) => {
  if (elem) {
    root.innerHTML = ``;
    root.appendChild(elem);
  }
};
