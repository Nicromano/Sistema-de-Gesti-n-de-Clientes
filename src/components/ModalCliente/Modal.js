import React from "react";

import validator from "validator";
import { addCustomer } from "../../api/Customer";
import { iscedula } from "../../helper/index";
import { mostrarExito } from "../../components/Alert/Alert";

const Modal = () => {
  const [customer, setCustomer] = React.useState({});
  const [valid, isValid] = React.useState(false);
  const submitButton = async () => {
    if (valid) {
      let _customer = await addCustomer(customer);
      if (_customer) {
        await mostrarExito(
          "Cliente agreagado",
          "El cliente se agregó correctamente",
          "success"
        );
        window.location.reload();
      } else {
        await mostrarExito(
          "Error",
          "El cliente no se agregó correctamente",
          "error"
        );
      }
    } else {
      await mostrarExito(
        "Formulario inválido",
        "Se necesitan más datos para agregar un cliente",
        "error"
      );
    }
  };

  const validacampos = () => {
    if (
      iscedula(customer.cedula) &&
      validator.isEmail(customer.correo ? customer.correo : "") &&
      customer.nombre !== "" &&
      customer.apellido !== "" &&
      customer.cedula !== "" &&
      customer.correo !== ""
    ) {
      isValid(true);
    } else {
      isValid(false);
    }
  };

  const handleFormChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setCustomer({
      ...customer,
      [name]: value,
    });
  };

  return (
    <>
      <button
        type="button"
        className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0  active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        data-bs-toggle="modal"
        data-bs-target="#exampleModalScrollable"
      >
        Nuevo cliente
      </button>
      <div
        className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        id="exampleModalScrollable"
        tabIndex="-1"
        aria-labelledby="exampleModalScrollableLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable relative w-auto pointer-events-none">
          <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
              <h5
                className="text-xl font-medium leading-normal text-gray-800"
                id="exampleModalScrollableLabel"
              >
                Agregar un nuevo cliente
              </h5>
              <button
                type="button"
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body relative p-4">
              <form>
                <div className="form-group mb-4">
                  <label
                    htmlFor="cedula"
                    className="form-label block text-left mb-2 text-gray-700"
                  >
                    Cédula:
                  </label>
                  <input
                    onChange={handleFormChange}
                    type="text"
                    name="cedula"
                    onBlur={validacampos}
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="cedula"
                    placeholder="Ingrese su CI"
                  />
                </div>
                <div className="form-group mb-4">
                  <label
                    htmlFor="nombre"
                    className="form-label block text-left mb-2 text-gray-700"
                  >
                    Nombre:
                  </label>
                  <input
                    onChange={handleFormChange}
                    type="text"
                    name="nombre"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="nombre"
                    placeholder="Ingrese su nombre"
                  />
                </div>
                <div className="form-group mb-4">
                  <label
                    htmlFor="apellido"
                    className="form-label block text-left mb-2 text-gray-700"
                  >
                    Apellido:
                  </label>
                  <input
                    onChange={handleFormChange}
                    type="text"
                    name="apellido"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="apellido"
                    placeholder="Ingrese su apellido"
                  />
                </div>
                <div className="form-group mb-4">
                  <label
                    htmlFor="email"
                    className="form-label block text-left mb-2 text-gray-700"
                  >
                    Correo electrónico:
                  </label>
                  <input
                    onChange={handleFormChange}
                    type="email"
                    name="correo"
                    onBlur={validacampos}
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="email"
                    placeholder="Ingrese su correo electrónico"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
              <button
                type="button"
                className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              <button
                type="button"
                onClick={submitButton}
                className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
