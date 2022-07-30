import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import validator from "validator";
import { iscedula } from "../../helper";
import { updateCustomer } from "../../api/Customer";
import { mostrarExito } from "../../components/Alert/Alert";
const EditCustomerPage = (props) => {
  const [customer, setCustomer] = useState({ ...JSON.parse(props.customer) });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    data.id = customer.id;
    let _customer = await updateCustomer(data);
    if (_customer) {
      await mostrarExito(
        "Cliente actualizado",
        "El cliente se actualizó correctamente",
        "success"
      );
      closeEdit();
    } else {
      await mostrarExito(
        "Error",
        "El cliente no se actualizó correctamente",
        "error"
      );
    }
  };
  
  useEffect(() => {
    setCustomer({ ...JSON.parse(props.customer) });
  }, [props.customer]);

  const closeEdit = () => {
    localStorage.removeItem("customer");
    window.location.reload();
  };
  return (
    <>
      <div>
        <section className="mx-2 shadow-lg bg-white  rounded-lg p-4 ">
          <div className="flex flex-col ">
            <div className="grid md:grid-cols-1 border-b sm:grid-cols-1 gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-500">
                  Actualiza los datos un clientes existente en la base de datos
                </h2>
              </div>
            </div>
            <div>
              <div className="grid md:grid-cols-1 h-auto  sm:grid-cols-1 my-4">
                <div className="">
                  {customer && (
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="form-group mb-4">
                        <label
                          htmlFor="cedula"
                          className="form-label block text-left mb-2 text-gray-700"
                        >
                          Cédula:
                        </label>
                        <input
                          type="text"
                          name="cedula"
                          {...register("cedula", {
                            required: true,
                            validate: (value) => iscedula(value),
                          })}
                          defaultValue={customer.cedula}
                          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id="cedula"
                          placeholder="Ingrese su CI"
                        />
                        {errors.cedula?.type === "required" && (
                          <span className="text-red-500">Campo requerido</span>
                        )}
                        {errors.cedula?.type === "validate" && (
                          <span className="text-red-500">
                            N° cédula incorrecta
                          </span>
                        )}
                      </div>
                      <div className="form-group mb-4">
                        <label
                          htmlFor="nombre"
                          className="form-label block text-left mb-2 text-gray-700"
                        >
                          Nombre:
                        </label>
                        <input
                          defaultValue={customer.nombre}
                          type="text"
                          name="nombre"
                          {...register("nombre", { required: true })}
                          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id="nombre"
                          placeholder="Ingrese su nombre"
                        />
                        {errors.nombre && (
                          <span className="text-red-500">Campo requerido</span>
                        )}
                      </div>
                      <div className="form-group mb-4">
                        <label
                          htmlFor="apellido"
                          className="form-label block text-left mb-2 text-gray-700"
                        >
                          Apellido:
                        </label>
                        <input
                          type="text"
                          name="apellido"
                          {...register("apellido", { required: true })}
                          defaultValue={customer.apellido}
                          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id="apellido"
                          placeholder="Ingrese su apellido"
                        />
                        {errors.apellido && (
                          <span className="text-red-500">Campo requerido</span>
                        )}
                      </div>
                      <div className="form-group mb-4">
                        <label
                          htmlFor="email"
                          className="form-label block text-left mb-2 text-gray-700"
                        >
                          Correo electrónico:
                        </label>
                        <input
                          type="email"
                          defaultValue={customer.correo}
                          name="correo"
                          {...register("correo", {
                            required: true,
                            validate: (value) => validator.isEmail(value),
                          })}
                          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id="email"
                          placeholder="Ingrese su correo electrónico"
                        />
                        {errors.correo?.type === "required" && (
                          <span className="text-red-500">Campo requerido</span>
                        )}
                        {errors.correo?.type === "validate" && (
                          <span className="text-red-500">No es un correo</span>
                        )}
                      </div>
                      <div className="flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                        <button
                          type="button"
                          onClick={closeEdit}
                          className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                        >
                          Cerrar
                        </button>
                        <input
                          type="submit"
                          className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                          value="Guardar cambios"
                        />
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default EditCustomerPage;
