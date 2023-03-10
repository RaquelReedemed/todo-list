import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

//archivo de funciones, donde en un archivo tengamos TODAS las funciones de la aplicacion y seran EXPORTADOS al componente que se necesita


//funcion para mostrar alertas de swetalert
export function show_alerta(mensaje, icono, foco='') {
    onfocus(foco);
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        title:mensaje,
        icono:icono
    })
}

//funcion que va a enceder el foco del inputs html, sera interno no importable
function onfocus(foco) {
    if(foco !== '') {
        document.getElementById(foco).focus();
    }
}

