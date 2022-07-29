import Swal from "sweetalert2";


export const mostrarAlertaSalir = () => {
    Swal.fire(
        {
            title: "Inicio de sesión",
            type: "warning",
            text: "Actualmente existe una sesión guardada. Deseas continuar?",
            confirmButtonText: "Continuar",
            showCancelButton: true,
        }
    ).then((result) => {
        if (result.value) {
            window.location.href = "/dashboard";
        } else {
            localStorage.removeItem('token');
            window.location.href = "/";

        }
    });

    
}
export const mostrarExito = async (titulo, text, icon) => {
    var result_data =
        await Swal.fire({
            title: titulo,
            text: text,
            icon: icon,
            showConfirmButton: true,
        })
    return result_data;

}
