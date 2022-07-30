import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import { deleteCustomer } from "../../api/Customer";
import { mostrarExito, mostrarAlertaEliminar } from "../Alert/Alert";


// eslint-disable-next-line react/prop-types, import/no-anonymous-default-export
export default ({ row, onDeleteRow, size }) => {

  const editRow = () => {
    localStorage.setItem("customer", JSON.stringify(row));
    window.location.reload(); 
  };
  const deleteRow = async () => {
    if (await mostrarAlertaEliminar("Cliente")) {
      let id = row.id;
      let _delete = await deleteCustomer(id);
      if (_delete) {
        /* Fila eliminada */
        await mostrarExito(
          "Cliente eliminado",
          "El cliente ha sido eliminado correctamente",
          "success"
        );
        window.location.reload();
      } else {
        /* Error al eliminar */
        await mostrarExito("Error", "No se pudo eliminar el cliente", "error");
      }
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        <div>
          <div className="dropstart relative">
            <button
              className=" dropdown-toggle"
              type="button"
              id="dropdownMenuButton1s"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </button>
            <ul
              className=" dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none
        "
              aria-labelledby="dropdownMenuButton1s"
            >
              <li>
                <a onClick={editRow}
                  className=" dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                  href="#!"
                >
                  <FontAwesomeIcon icon={faEdit} /> Editar cliente
                </a>
              </li>
              <li>
                <a
                  className=" dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100
            "
                  onClick={deleteRow}
                  href="#!"
                >
                  <FontAwesomeIcon icon={faTrash} /> Eliminar cliente
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
