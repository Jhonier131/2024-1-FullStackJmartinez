import { useEffect, useState } from "react";
import Sidebar from "../../shared/sidebar/Sidebar";
import "./CrearUsuario.css";
import axios from "axios";
import { SweetAlerts } from "../../../core/SweetAlertServices";

function CrearUsuario() {
  const initialVal = {
    rol: "2",
    name: "",
    password: "",
  };

  const [userData, setUserData] = useState(initialVal);
  const [objUsers, setobjUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const resp = await axios.get("http://localhost:4000/restaurant/getUsers");
        setobjUsers(resp.data.payload);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };
    getUsers();
  }, []);

  // console.log(Object.keys(objUsers).length);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const crearNuevoUsuario = await axios.post("http://localhost:4000/restaurant/createUser", userData);
    console.log(crearNuevoUsuario.data);
    SweetAlerts.successAlert(crearNuevoUsuario.data.message);
    setUserData(initialVal);
    setobjUsers([...crearNuevoUsuario.data.payload.users]);
  };

  console.log(objUsers);

  return (
    <>
      <Sidebar></Sidebar>
      <div className="contenedor-newUsers">
        <div className="user-module">
          <h2>Crear Nuevo Usuario</h2>
          <form onSubmit={handleSubmit}>
            <div className="crearUsuario">
              <label htmlFor="rol">Rol:</label>
              <select id="rol" name="rol" value={userData.rol} onChange={handleChange}>
                <option value="3">Cocinero</option>
                <option value="2">Mesero</option>
              </select>
            </div>
            <div className="crearUsuario">
              <label htmlFor="name">Nombre de Usuario:</label>
              <input type="text" id="name" name="name" value={userData.name} onChange={handleChange} required />
            </div>
            <div className="crearUsuario">
              <label htmlFor="password">Contraseña:</label>
              <input type="password" id="password" name="password" value={userData.password} onChange={handleChange} required />
            </div>
            <button className="btn-crearUsuario" type="submit">
              Crear Usuario
            </button>
          </form>
        </div>

        {Object.keys(objUsers).length > 0 ? (
          <table className="user-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Password</th>
                <th>Rol</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(objUsers).map(([index, user]) => {
                return (
                  <tr key={index} className="user-row">
                    <td>{user.name}</td>
                    <td>{user.password}</td>
                    <td>{user.rol}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default CrearUsuario;
