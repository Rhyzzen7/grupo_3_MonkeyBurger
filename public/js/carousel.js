let images = [
  "/img/varias/varias05.jpg",
  "/img/varias/varias09.JPEG",
  "/img/varias/varias12.JPG",
];
let cont = 0;
function carousel(contenedor) {
  contenedor.addEventListener("click", (e) => {
    let atras = contenedor.querySelector(".izquierda i");
    let adelante = contenedor.querySelector(".derecha i");
    let img = contenedor.querySelector("img");
    let tgt = e.target;

    if (tgt == atras) {
      if (cont > 0) {
        img.src = images[cont - 1];
        cont--;
      } else {
        img.src = images[images.length - 1];
        cont = images.length - 1;
      }
    } else if (tgt == adelante) {
      if (cont < images.length - 1) {
        img.src = images[cont + 1];
        cont++;
      } else {
        img.src = images[0];
        cont = 0;
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  let contenedor = document.querySelector(".imagenes-carrete");
  carousel(contenedor);
});
