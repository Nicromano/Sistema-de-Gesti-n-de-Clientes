import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { isExistUser, logout, getUsers } from "../../api/User";
import { getCustomers } from "../../api/Customer";
import { mostrarExito } from "../../components/Alert/Alert";
import PointComponent from "../../components/Table/PointComponent";
import logo from "../../Resource/logo.svg";
import Modal from "../../components/ModalCliente/Modal";
import Table from "../../components/Table/Table";
const Dashboard = () => {
  const [user, setUser] = useState({});
  const [cargando, setCargando] = useState(true);
  const [customers, setCustomers] = useState([]);
  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
      compact: true,
      minWidth: "5vh",
      maxWidth: "8vh",
    },
    {
      name: "Cédula",
      selector: (row) => row.cedula,
      sortable: true,
      compact: true,
      minWidth: "5vh",
      maxWidth: "40vh",
    },
    {
      name: "Nombre",
      selector: (row) => row.nombre,
      sortable: true,
      compact: true,
      minWidth: "5vh",
      maxWidth: "50vh",
    },

    {
      name: "Apellido",
      selector: (row) => row.apellido,
      sortable: true,
      compact: true,
      minWidth: "5vh",
      maxWidth: "50vh",
    },
    {
      name: "Correo",
      selector: (row) => row.correo,
      sortable: true,
    },
    {
      cell: (row) => <PointComponent size="small" row={row} />,
      allowOverflow: true,
      button: true,
      width: "56px",
    },
  ];

  useEffect(() => {
    if (!isExistUser()) {
      window.location.href = "./";
    }
    getUsers().then((result) => {
      if (result) {
        setUser(...result);
      } else {
        mostrarExito(
          "Atención",
          "La sesión a caducado. Inicie sesión de nuevo",
          "warning"
        );
        logout();
      }
    });
  }, []);

  useEffect(() => {
    getCustomers().then((result) => {
      if (result) {
        setCustomers([...result]);
        setCargando(false);
      }
    });
  }, []);

  return (
    <>
      <div className=" w-screen  h-screen">
        <Navbar usuario={user} activado={2} />
        <section className="p-4 ">
          <div className="flex flex-col ">
            <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Sistema de Gestion de Clientes
                </h1>
                <h2 className="text-xl font-semibold text-gray-500">
                  Listado de clientes existentes acualmente en la base de datos
                </h2>
              </div>
            </div>
            <div>
              {/* table */}
              <div className="grid md:grid-cols-2 h-auto  sm:grid-cols-1 my-4">
                {!cargando && (
                  <div className="shadow-lg bg-white  rounded-lg p-4">
                    <Table
                      name="Clientes actuales"
                      data={customers}
                      busqueda={"correo"}
                      columns={columns}
                    />
                  </div>
                )}
                <div>
                  <div className="grid w-60 mx-auto content-center grid-rows-2 gap-4 ">
                    <div>
                      <img src={logo} alt="logo" width="400" />
                    </div>
                    <div className="text-center">
                      <h2 className="text-xl mb-4 font-semibold text-gray-500">
                        Agrega un nuevo cliente
                      </h2>
                      <Modal />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <footer className="relative bg-gray-100 ">
          <div className="container mx-auto px-4 ">
            <div className="flex flex-wrap sm:text-left pt-8 sm:pl-8 text-center lg:text-left">
              <div className="w-full md:w-6/12 lg:px-4">
                <h4 className="text-lg font-semibold  text-gray-800">
                  Farmacias San Gregorio
                </h4>
                <h5 className="text-xs mt-0 mb-2  text-gray-800">
                  SISTEMA DE GESTIÓN DE CLIENTES
                </h5>
              </div>
              <div className="w-full pt-2 md:pt-0 md:w-6/12 pl-4">
                <div className="flex  items-top mb-6">
                  <div className="w-full pl-4 ml-auto">
                    <h4 className="text-xs font-semibold  text-gray-800">
                      DEVELOPING
                    </h4>
                    <h5 className="text-xs mt-0 mb-2  text-gray-800">
                      Jose Alberto León Alarcón
                    </h5>
                  </div>
                  <div className="w-full px-4">
                    <h4 className="text-xs font-semibold  text-gray-800">
                      CONTENT
                    </h4>
                    <h5 className="text-xs mt-0 mb-2  text-gray-800">
                      Software para la gestión de clientes
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <hr className=" border-blueGray-300" />
            <div className="flex py-2 flex-wrap items-center md:justify-between justify-center">
              <div className="w-full md:w-4/12 px-4 mx-auto text-center">
                <div className="text-sm  text-gray-800 py-1">
                  Copyright © <span id="get-current-year">2022</span>
                  <a
                    href="https://www.creative-tim.com/product/notus-js"
                    className="text-blueGray-500 hover:text-gray-800"
                    target="_blank"
                    rel="noreferrer"
                  />
                  <a
                    href="https://www.creative-tim.com?ref=njs-profile"
                    className="text-blueGray-500 hover:text-blueGray-800"
                  ></a>
                  .
                </div>
              </div>
            </div>
          </div>
        </footer> */}
      </div>
    </>
  );
};

export default Dashboard;
