/* eslint-disable no-undef */

window.addEventListener("load", function () {
  let formulario = document.querySelector(".formulario");
  formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    let errores = [];

    let fieldName = document.querySelector("input[name=name]");
    if (fieldName.value.length == 0) {
      errores.push("El NOMBRE es obligatorio.");
    } else if (fieldName.value.length < 5) {
      errores.push("El NOMBRE debe tener, al menos, 5 caracteres.");
    }

    let fieldDescription = document.querySelector('textarea.campo-completar');
    console.log(fieldDescription.value)
    if (fieldDescription.value.length < 20) {
      errores.push("La DESCRIPCIÓN debe tener, al menos, 20 caracteres.");
    }

    let fieldImage = document.querySelector("input[name=foto-producto]");
    var validExt = ["gif", "jpg", "png", "jpge"];
    var ext = fieldImage.value.split(".").pop();
    if (validExt.indexOf(ext.toLowerCase()) === -1) {
      errores.push("La IMAGEN debe tener extensión GIF, JPG, PNG o JPGE.");
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
