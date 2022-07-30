import React, { useState } from "react";
import logo_Farm from "../../Resource/target.png";
import { registerUser } from "../../api/User";
import { useForm } from "react-hook-form";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false); /* Estado cargando */
  const [info, setInfo] =
    useState(false); /* Estado para mostrar un mensaje sobre la petición */

  const handleFormSubmit = async (data) => {
    setLoading(true);
    const _register = await registerUser(data);
    setLoading(false); //Elimina el estado cargando

    if (_register) window.location.href = "./dashboard";
    else {
      setInfo(true); //Muestra tostada con información para el usuario
      setInterval(() => {
        setInfo(false); //Oculta tostada de información
      }, 10000);
    }
  };

 
  return (
    <>
      <div className="min-h-full flex justify-center py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full ">
          <div>
            <img
              className="mx-auto h-16 w-auto"
              src={logo_Farm}
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Registra un nuevo Usuario
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              o{" "}
              <a
                href="/"
                className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
              >
                Inicia sesión
              </a>
            </p>
          </div>
          <form
            className="mt-2 space-y-4"
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            <div className="form-group mb-4">
              <label
                htmlFor="apodo"
                className="form-label text-left block mb-2 text-gray-700"
              >
                Apodo:
              </label>
              <input
                type="text"
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="apodo"
                name="apodo"
                {...register("apodo", {
                  required: true,
                })}
                placeholder="Enter username"
              />
              {errors.apodo?.type === "required" && (
                <span className="text-red-500">Campo requerido</span>
              )}
            </div>
            <div className="form-group mb-4">
              <label
                htmlFor="nombre"
                className="form-label text-left block mb-2 text-gray-700"
              >
                Nombres:
              </label>
              <input
                type="text"
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="nombre"
                {...register("nombre", {
                  required: true,
                })}
                name="nombre"
                placeholder="Enter your name"
              />
               {errors.nombre?.type === "required" && (
                <span className="text-red-500">Campo requerido</span>
              )}
            </div>
            <div className="form-group mb-4">
              <label
                htmlFor="correo"
                className="form-label text-left block mb-2 text-gray-700"
              >
                Correo electrónico:
              </label>
              <input
                type="email"
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="correo"
                {...register("correo", {
                  required: true,
                })}
                name="correo"
                placeholder="Enter email"
                
              />
              {errors.correo?.type === "required" && (
                <span className="text-red-500">Campo requerido</span>
              )}
            </div>

            <div className="form-group mb-4">
              <label
                htmlFor="password"
                className="form-label block text-left mb-2 text-gray-700"
              >
                Contraseña:
              </label>
              <input
                type="password"
                name="contraseña"
                {...register("contraseña", {
                  required: true,
                })}
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="password"
                placeholder="Password"
              />
              {errors.contraseña?.type === "required" && (
                <span className="text-red-500">Campo requerido</span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center"></div>

              <div className="text-sm"></div>
            </div>
            {loading && (
              <div className="flex justify-center items-center space-x-2">
                <div
                  className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-red-500"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
            <div>
              <input
                type="submit"
                value='Registrar'
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              />
                
            </div>
          </form>
        </div>
      </div>

      {info && (
        <div className="flex flex-row-reverse px-3">
          <div className="flex flex-col justify-center">
            <div
              className="bg-red-600 shadow-lg mx-auto w-96 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block mb-3"
              id="static-example"
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
              data-mdb-autohide="false"
            >
              <div className="bg-red-600 flex justify-between items-center py-2 px-3 bg-clip-padding border-b border-red-500 rounded-t-lg">
                <p className="font-bold text-white flex items-center">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="times-circle"
                    className="w-4 h-4 mr-2 fill-current"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"
                    ></path>
                  </svg>
                  Info Usuario
                </p>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => {
                      setInfo(false);
                    }}
                    className="btn-close btn-close-white box-content w-4 h-4 ml-2 text-white border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-white hover:opacity-75 hover:no-underline"
                    data-mdb-dismiss="toast"
                    aria-label="Close"
                  ></button>
                </div>
              </div>
              <div className="p-3 bg-red-600 rounded-b-lg break-words text-white">
                No se pudo registrar el usuario
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
