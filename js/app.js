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
    const cantidad = document.querySelector('#cantidad').value;

    // Validar
    if(nombre === '' || cantidad === '') {
        ui.imprimirAlerta('Ambos campos son obligatorios', 'error');

        return;
    } else if ( cantidad <= 0 || isNaN(cantidad)) {
        ui.imprimirAlerta('Cantidad no validad', 'error');

        return;
    }

    console.log('Agregando Gasto');
}