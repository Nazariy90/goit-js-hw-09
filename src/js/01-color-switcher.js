const startBTN = document.querySelector('button[data-start]');
const stopBTN = document.querySelector('button[data-stop]');
const bodyBackgroundColor = document.body;
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function changeColorFoo() {
  const currentColor = getRandomHexColor();
  bodyBackgroundColor.style.backgroundColor = currentColor;
}

startBTN.addEventListener('click', () => {
  timerId = setInterval(changeColorFoo, 1000);
  startBTN.disabled = true;
});

stopBTN.addEventListener('click', () => {
  clearInterval(timerId);
  startBTN.disabled = false;
});
