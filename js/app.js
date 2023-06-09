// variables 

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];


cargarEventListeners();
function cargarEventListeners() {
    // Cuando agregas un curso presionando "Agregando al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso)

    //Vaciar el carrito
    vaciarCarrrito.addEventListener('click', () => {
      articulosCarrito = [];

      limpiarHTML();
    })
}


// Funciones
function agregarCurso(e) {
    e.preventDefault(); // es para que cuando haga click no vaya para arriba


    if (e.target.classList.contains('agregar-carrito') ) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

// Elimina un curso del carrito
function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso') ) {
        const cursoId = e.target.getAttribute('data-id');

        // Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter (curso => curso.id !== cursoId) ;

        carritoHTML();
    };
} 

// Lee el contenido del html al que se le dio click y extrae la info
function leerDatosCurso(curso){
    // console.log(curso);

   

// Crear un objeto con el contenido del curso actual
  const infoCurso = {
    imagen : curso.querySelector('img').src,
    titulo : curso.querySelector('h4').textContent,
    precio : curso.querySelector('.precio span').textContent,
        id : curso.querySelector('a').getAttribute('data-id'),
  cantidad : 1,

  }

  // Revisa si un elemento ya existe en el carrito
  const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);

  if (existe) {

    //Actualizamos la cantidad
    const cursos = articulosCarrito.map( curso => {
        if(curso.id === infoCurso.id) {
            curso.cantidad++;
            return curso;
        } else {
            return curso;
        }
    });
    articulosCarrito = [...cursos];
  } else {

     // Agrega elementos al arreglo de carrito
   articulosCarrito = [...articulosCarrito, infoCurso];
  }

  



   console.log(articulosCarrito);
   carritoHTML();
}

// MUestra el carrtio de compras en el HTML
function carritoHTML() {

    //Limpiar el HTML
    limpiarHTML();

    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {
        console.log(curso);
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src = "${curso.imagen}" width="100">
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>${curso.cantidad}</td>
        <td>
        <a href="#" class="borrar-curso" data-id="${curso.id}"> X </a>
        </td>
           
        `
        // Agrega el html del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}

function limpiarHTML() {
    // Elmina los cursos del tbody
    while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}