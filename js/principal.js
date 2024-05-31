const hamburguer = document.querySelector('.hamburguer')
const menu = document.querySelector('.menu-nav')


hamburguer.addEventListener('click', ()=>{
    menu.classList.toggle("spread")
})

window.addEventListener('click', e =>{
    if(menu.classList.contains('spread') 
    // Verifica si el menú tiene la clase 'spread' y si el clic no fue en el menú ni en el hamburguer, si fue hecho, alterna la clase spread=extender
        && e.target != menu && e.target != hamburguer){
        console.log('cerrar')
        menu.classList.toggle("spread")
    }
})
//seleccionamos las imagenes y los div de imagenes
const imagenes = document.querySelectorAll(".img-galeria");
const imagenLight = document.querySelector(".agregar-imagen");
const contenedorLight = document.querySelector(".imagen-light");
const closeLight = document.querySelector(".close");

imagenes.forEach((imagen) => {
  // Llama a la función aparecerImagen pasando la URL de la imagen como argumento
  imagen.addEventListener("click", () => {
    aparecerImagen(imagen.getAttribute("src"));
  });
});

contenedorLight.addEventListener("click", (e) => {
  // Verifica si el elemento clickeado no es la imagen dentro del lightbox
  if (e.target !== imagenLight) {
    contenedorLight.classList.toggle("show");
    imagenLight.classList.toggle("showImage");
    hamburguer.style.opacity = "1";
  }
});
// Define la función aparecerImagen que toma la URL de una imagen como argumento
const aparecerImagen = (imagen) => {
  imagenLight.src = imagen;
  contenedorLight.classList.toggle("show");
  imagenLight.classList.toggle("showImage");
  hamburguer.style.opacity = "0";
};

