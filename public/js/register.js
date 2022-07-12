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

    let fieldName = document.querySelector("input[name=firstname]");
    if (fieldName.value.length == 0) {
      errores.push("El NOMBRE es obligatorio.");
    } else if (fieldName.value.length < 5) {
      errores.push("El NOMBRE debe tener, al menos, 5 caracteres.");
    }

    let fieldSurname = document.querySelector("input[name=lastname]");
    if (fieldSurname.value.length == 0) {
      errores.push("El APELLIDO es obligatorio.");
    } else if (fieldSurname.value.length < 2) {
      errores.push("El APELLIDO debe tener, al menos, 2 caracteres.");
    }

    let fieldEmail = document.querySelector("input[name=email]");
    if (fieldEmail.value.length == 0) {
      errores.push("El EMAIL es obligatorio.");
    } else if (!validateEmail(fieldEmail.value)) {
      errores.push("El EMAIL debe tener un formato válido.");
    }

    let fieldImage = document.querySelector("input[name=userimage]");
    var validExt = ["gif", "jpg", "png", "jpge"];
    var ext = fieldImage.value.split(".").pop();
    if (validExt.indexOf(ext.toLowerCase()) == -1) {
      errores.push("La IMAGEN debe tener extensión GIF, JPG, PNG o JPGE.");
    }

    let fieldContrasena = document.querySelector("input[name=password]");
    if (fieldContrasena.value.length == 0) {
      errores.push("La CONTRASEÑA es obligatoria.");
    } else if (fieldContrasena.value.length < 8) {
      errores.push("La CONTRASEÑA debe contener, al menos, 8 caracteres.");
    } else if (!fieldContrasena.value.match(/[a-z]+/)) {
      errores.push("La CONTRASEÑA debe contener, al menos, una minúscula.");
    } else if (!fieldContrasena.value.match(/[A-Z]+/)) {
      errores.push("La CONTRASEÑA debe contener, al menos, una mayúscula.");
    } else if (!fieldContrasena.value.match(/[0-9]+/)) {
      errores.push("La CONTRASEÑA debe contener, al menos, un número.");
    } else if (
      !fieldContrasena.value.match(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/)
    ) {
      errores.push(
        "La CONTRASEÑA debe contener, al menos, un carácter especial."
      );
    }

    let fieldConfirmContrasena = document.querySelector("input[name=confirm]");
    if (fieldConfirmContrasena.value !== fieldContrasena.value) {
      errores.push("Las CONTRASEÑAS no coinciden.");
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
