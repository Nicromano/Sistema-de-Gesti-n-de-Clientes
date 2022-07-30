import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { isExistUser, logout, getUsers } from "../../api/User";
import { getCustomers } from "../../api/Customer";
import { mostrarExito } from "../../components/Alert/Alert";
import PointComponent from "../../components/Table/PointComponent";
import logo from "../../Resource/logo.svg";
import Modal from "../../components/ModalCliente/Modal";
import Table from "../../components/Table/Table";
import EditCustomerPage from "../EditCustomerPage/EditCustomerPage";

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const Dashboard = () => {
  const [user, setUser] = useState({});
  const [cargando, setCargando] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState(null);
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
    setCustomer(localStorage.getItem("customer"));
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
                {!cargando ? (
                  <div className="shadow-lg bg-white  rounded-lg p-4">
                    <Table
                      name="Clientes actuales"
                      data={customers}
                      busqueda={"correo"}
                      columns={columns}
                    />
                  </div>
                ): (
                  <Skeleton count={15} /> 
                )}
                {customer ? (
                   <EditCustomerPage customer={customer}/>
                ) : (
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
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
