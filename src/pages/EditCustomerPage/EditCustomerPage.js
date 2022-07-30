import React, { useState, useEffect } from "react";

const EditCustomerPage = (props) => {
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    setCustomer(props.customer);
  }, [props.customer]);

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
              {/* table */}
              <div className="grid md:grid-cols-1 h-auto  sm:grid-cols-1 my-4">
                <div className="">
                  {customer && (
                    <form>
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
                          defaultValue={customer.cedula}
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
                          value={customer.nombre}
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
                          type="text"
                          name="apellido"
                          value={customer.apellido}
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
                          type="email"
                          value={customer.correo}
                          name="correo"
                          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id="email"
                          placeholder="Ingrese su correo electrónico"
                        />
                      </div>
                      <div className="flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                        <button
                          type="button"
                          className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                        >
                          Cerrar
                        </button>
                        <button
                          type="button"
                          className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                        >
                          Guardar cambios
                        </button>
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
