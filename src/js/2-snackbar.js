import iziToast from "izitoast";

document.querySelector(".form").addEventListener("submit", function (event) {
  event.preventDefault();

  const delayInput = document.querySelector("input[name='delay']");
  const stateRadio = document.querySelector("input[name='state']:checked");

  const delay = parseInt(delayInput.value);

  const snackbarPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (stateRadio.value === "fulfilled") {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  snackbarPromise
    .then((delay) => {
      iziToast.success({
        title: "Fulfilled promise",
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
    .catch((delay) => {
      iziToast.error({
        title: "Rejected promise",
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });
});
