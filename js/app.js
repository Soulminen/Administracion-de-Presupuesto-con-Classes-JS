// Variables y Selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');





// Eventos

eventListeners();
function eventListeners() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto );

    formulario.addEventListener('submit', agregarGasto);
}




// Classes

class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }


    nuevoGasto(gasto) {
        this.gastos = [...this.gastos, gasto];
        this.calcularRestante();
    }

    calcularRestante() {
        const gastado = this.gastos.reduce( (total, gasto) => total + gasto.cantidad, 0)
        this.restante = this.presupuesto - gastado;
    }

}

class UI {

    insertarPresupuesto( cantidad ) {
      const { presupuesto, restante } = cantidad
      document.querySelector('#total').textContent = presupuesto;
      document.querySelector('#restante').textContent = restante;
    }

    imprimirAlerta(mensaje, tipo) {
        // crear el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');

        if(tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }

        // mensaje de error
        divMensaje.textContent = mensaje;

        // Insertar en el HTML

        document.querySelector('.primario').insertBefore( divMensaje, formulario);

        // Quitar del HTML

        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }

    agregarGastoListado(gastos) {

        this.limpiarHTML(); // Elimina el HTML previo
        // Iterar sobre los gastos
        gastos.forEach( gasto => {
            const { cantidad, nombre, id } = gasto;

            // Crear un LI
            const nuevoGasto = document.createElement('li');
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
            nuevoGasto.dataset.id = id;


            // Agregar el HTML del gasto

            nuevoGasto.innerHTML = ` ${nombre} <span class="badge badge-primary badge-pill"> $ ${cantidad} </span>`;


            // Boton para borrar el gasto

            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
            btnBorrar.innerHTML= 'Borrar &times;'
            nuevoGasto.appendChild(btnBorrar);

            // Agregar al HTML

            gastoListado.appendChild(nuevoGasto);

        });
    }

    limpiarHTML() {
        while( gastoListado.firstChild ) {
            gastoListado.removeChild(gastoListado.firstChild);
        }
    }

    actualizarRestante(restante) {
        document.querySelector('#restante').textContent = restante;
    }

}

// Instanciar
const ui = new UI();
let presupuesto;


// Funciones

function preguntarPresupuesto() {
    const presupuestoUsuario = prompt('¿Cual es tu presupuesto?');

    // console.log( Number( presupuestoUsuario) );

    if(presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0) {
        window.location.reload();
    }

    // Presupuesto valido
    presupuesto = new Presupuesto(presupuestoUsuario);
    console.log(presupuesto);

    ui.insertarPresupuesto(presupuesto);

}

// Añade gastor
function agregarGasto(e) {
    e.preventDefault();


    // Leer los datos de Formulario
    const nombre = document.querySelector('#gasto').value;
    const cantidad = Number(document.querySelector('#cantidad').value);

    // Validar
    if(nombre === '' || cantidad === '') {
        ui.imprimirAlerta('Ambos campos son obligatorios', 'error');

        return;
    } else if ( cantidad <= 0 || isNaN(cantidad)) {
        ui.imprimirAlerta('Cantidad no validad', 'error');

        return;
    }

    // Generar un objeto con el gasto

    const gasto = { nombre, cantidad, id: Date.now() }

    presupuesto.nuevoGasto( gasto );
    
    ui.imprimirAlerta('Gasto agregado Correctamente');

    // Imprimir los gastos
    const { gastos, restante } = presupuesto;
    ui.agregarGastoListado(gastos);

    ui.actualizarRestante(restante);



    // Reinicia el formulario
    formulario.reset();

}