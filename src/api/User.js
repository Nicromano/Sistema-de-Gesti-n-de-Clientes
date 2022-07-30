import { mostrarExito } from "../components/Alert/Alert";
const API = "https://infofsg.com/mockapi";

export const login = async (user) => {
  let _login = null;
  try {
    const responseLogin = await fetch(`${API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    /* Retornar el json con los datos obtenidos*/
    _login = await responseLogin.json();
  } catch (error) {
    return false;
  }
  if (_login.message === "success") {
    localStorage.setItem("token", _login.data.token);
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("customer");
  window.location.href = "/";
};
export const isExistUser = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return true;
  }
  return false;
};

export const getUsers = async () => {
  const token = localStorage.getItem("token");
  const responseUsers = await fetch(`${API}/auth/datos_usuario`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "access-token": token,
    },
  });

  const _usuarios = await responseUsers.json();

  if (_usuarios.message === "success") {
    let c = _usuarios.data;
    return c;
  }
  return null;
};

export const registerUser = async (user) => {
  user.apellido = "";
  user.cedula = "";

  let _register = null;
  try {
    const responeRegister = await fetch(`${API}/usuarios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    _register = await responeRegister.json();
  } catch (error) {
    return false;
  }
  if (_register.message === "success") {
    await mostrarExito(
      "Usuario agreagado",
      "El usuario se agregó correctamente",
      "success"
    );
    const _login = await login({
      usuario: user.apodo,
      contraseña: user.contraseña,
    });
    return _login;
  }
  return false;
};
