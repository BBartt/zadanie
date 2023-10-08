const errorDialogMsg = "Formularz nie jest poprawnie wypełniony";
const successDialogMsg = "Dzień dobry:";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form");

  const inputName = document.querySelector("#name");
  const inputLastname = document.querySelector("#lastname");
  const inputEmail = document.querySelector("#email");

  const dialog = document.querySelector(".dialog");
  const dialogMsg = dialog.querySelector(".dialog-msg");
  const dialogBtn = dialog.querySelector(".btn");

  fillInputsWithLocalStorageData();
  setActiveInputs([inputName, inputLastname, inputEmail]);

  document.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameValue = inputName.value;
    const lastnameValue = inputLastname.value;
    const emailValue = inputEmail.value;

    if (
      nameValue.length > 0 &&
      lastnameValue.length > 0 &&
      emailValue.length > 0
    ) {
      dialogMsg.textContent = `${successDialogMsg} ${nameValue} ${lastnameValue}`;
      dialog.classList.add("success");
    } else {
      dialogMsg.textContent = errorDialogMsg;
    }

    dialog.showModal();
  });

  dialogBtn.addEventListener("click", () => {
    dialog.classList.remove("success");
    dialog.close();
  });

  form.addEventListener("input", (e) => {
    const { value, id } = e.target;

    setActiveInput(e.target);

    saveInLocalStorage(id, value);
  });

  function saveInLocalStorage(key, value) {
    const existingData = JSON.parse(localStorage.getItem("inputsState")) || {};

    const updatedData = { ...existingData, ...{ [key]: value } };

    localStorage.setItem("inputsState", JSON.stringify(updatedData));
  }

  function fillInputsWithLocalStorageData() {
    const savedData = JSON.parse(localStorage.getItem("inputsState"));

    if (savedData) {
      inputName.value = savedData.name ?? "";
      inputLastname.value = savedData.lastname ?? "";
      inputEmail.value = savedData.email ?? "";
    }
  }

  function setActiveInput(input) {
    if (input.value.length > 0) {
      input.parentElement.classList.add("active");
      return;
    }

    input.parentElement.classList.remove("active");
  }

  function setActiveInputs(inputs) {
    inputs.forEach((input) => {
      setActiveInput(input);
    });
  }
});
