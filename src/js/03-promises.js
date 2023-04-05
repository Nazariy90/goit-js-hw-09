import Notiflix from 'notiflix';

function createPromise(position, firstDelay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, firstDelay });
      } else {
        reject({ position, firstDelay });
      }
    }, firstDelay);
  });
}

const submitForm = document.querySelector('.form');

submitForm.addEventListener('submit', event => {
  event.preventDefault();

  const firstDelay = Number(event.target.elements.delay.value);
  const delayStep = Number(event.target.elements.step.value);
  const amountField = Number(event.target.elements.amount.value);

  for (let i = 1; i <= amountField; i++) {
    const position = i;
    const promiseDelay = firstDelay + delayStep * (i - 1);
    createPromise(position, promiseDelay)
      .then(({ position, firstDelay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${firstDelay}ms`
        );
      })
      .catch(({ position, firstDelay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${firstDelay}ms`
        );
      });
  }
});
