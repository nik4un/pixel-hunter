const root = document.querySelector(`.central`);

export default (...elems) => {
  if (elems) {
    root.innerHTML = ``;
    elems.forEach((el) => {
      root.appendChild(el);
    });
  }
};
