import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { isExistUser, logout, getUsers } from "../../api/User";
import { mostrarExito } from "../../components/Alert/Alert";

const Dashboard = () => {
  const [user, setUser] = useState({});
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


  return (
    <>
      <Navbar usuario={user} />
    </>
  );
};

export default Dashboard;
