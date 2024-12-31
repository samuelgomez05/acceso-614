const FORM = document.querySelector('#form-contact');
const NAME = document.querySelector('#contact-name');
const NUMBER = document.querySelector('#contact-number');
const EMAIL = document.querySelector('#contact-email');
const MESSAGE = document.querySelector('#textarea');
const REGEXEMAIL = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

// Escuchamos el evento input de cada input para remover el mensaje de validación personalizado
isWritingInput(NAME);
isWritingInput(NUMBER);
isWritingInput(EMAIL);
isWritingInput(MESSAGE);

// Escuchamos la tecla presionada del teclado para validar solo numeros
isWritingNumber(NUMBER);

FORM.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!validateField(NAME)) return;
  if (!validateField(NUMBER)) return;
  if (!validateField(EMAIL, REGEXEMAIL)) return;
  if (!validateField(MESSAGE)) return;

  /* alert('¡Mensaje enviado con éxito!'); */
});

function isWritingInput(input) {
  input.addEventListener('input', () => {
    input.setCustomValidity(''); // Quitamos el mensaje de validación personalizado
  });
}

function isWritingNumber(input) {
  input.addEventListener('keydown', (e) => {
    const isKeyValid = (e.keyCode === 8 || e.keyCode === 9 || e.keyCode === 37 || e.keyCode === 39) ? true : false;
    const isAlphabeticNumber = (e.keyCode >= 48 && e.keyCode <= 57) ? true : false;
    const isNumericNumber = (e.keyCode >= 96 && e.keyCode <= 105) ? true : false;

    if (!isKeyValid && !isAlphabeticNumber && !isNumericNumber) {
      e.preventDefault();

      input.setCustomValidity('Este campo acepta solo números');
      input.reportValidity(); // Esto fuerza la validación inmediatamente
    }
  });
}

function isInputFull(input) {
  if (input.value === '') {
    if (!input.hasAttribute('required')) {
      input.setAttribute('required', '');
    }

    input.reportValidity(); // Esto fuerza la validación inmediatamente

    return false;
  }

  return true;
}

function isValidEmail(input, regexEmail) {
  if (input.value.match(regexEmail) === null) {
    input.setCustomValidity('Ingresa un correo electrónico válido');
    input.reportValidity(); // Esto fuerza la validación inmediatamente

    return false;
  }

  return true;
}

function isValidNumber(input) {
  if (input.value.match(REGEXNUMBER) === null) {
    input.setCustomValidity('Ingresa un número válido');
    input.reportValidity(); // Esto fuerza la validación inmediatamente

    return false;
  }

  return true;
}

function validateField(input, regexEmail = null) {
  if (!isInputFull(input)) {
    return false;
  }

  if (regexEmail !== null) {
    if (!isValidEmail(input, regexEmail)) {
      return false;
    }
  }

  return true;
}