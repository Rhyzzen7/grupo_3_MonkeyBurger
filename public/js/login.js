/* eslint-disable no-undef */

function validateEmail(email) {
  return !!(
    email &&
    email.length > 0 &&
    email.match(/[a-z0-9]+@[a-z0-9]+\.[a-z]{2,3}/)
  );
}

window.addEventListener("load", function () {
  let formulario = document.querySelector(".formulario");
  formulario.addEventListener("submit", function (e) {
    let errores = [];

    let fieldEmail = document.querySelector("input[name=email]");
    if (fieldEmail.value.length == 0) {
      errores.push("El EMAIL es obligatorio.");
    } else if (!validateEmail(fieldEmail.value)) {
      errores.push("El EMAIL debe tener un formato válido.");
    }

    let fieldContrasena = document.querySelector("input[name=password]");
    if (fieldContrasena.value.length == 0) {
      errores.push("La CONTRASEÑA es obligatoria.");
    }

    if (errores.length > 0) {
      e.preventDefault();
      let ulErrores = document.querySelector(".erroresFront");
      ulErrores.innerHTML = "";
      for (let i = 0; i < errores.length; i++) {
        ulErrores.innerHTML += "<li>" + errores[i] + "</li>";
      }
    }
  });
});
