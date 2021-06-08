document.addEventListener('DOMContentLoaded', function() {
    crearGaleria();
})

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');

    for(let i = 1; i <= 12; i++ ) {
        const imagen = document.createElement('IMG');
        imagen.src = `build/img/thumb/${i}.webp`;
        imagen.dataset.imagenId = i;


        // Añadir la función de mostrar imagen
        imagen.onclick = mostrarImagen;

        const lista = document.createElement('LI');
        lista.appendChild(imagen);

        galeria.appendChild(lista);
    }
}

function mostrarImagen(e) {
    const id = parseInt(e.target.dataset.imagenId);

    const imagen = document.createElement('IMG');
    imagen.src = `build/img/grande/${id}.webp`;

    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');



    // Boton para cerrar imagen
    const cerrarImagen = document.createElement('P');
    cerrarImagen.textContent = 'X';
    cerrarImagen.classList.add('btn-cerrar');

 

    overlay.appendChild(cerrarImagen);

    // Añadir en el HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijarbody')

    // cuando se da click, se cierra la imagen
    overlay.onclick = () => {
        overlay.remove();
        body.classList.remove('fijarbody');
    }

    // cuando se presiona, se cierra la imagen
    cerrarImagen.onclick = () => {
        overlay.remove();
        body.classList.remove('fijarbody');
    }



}
