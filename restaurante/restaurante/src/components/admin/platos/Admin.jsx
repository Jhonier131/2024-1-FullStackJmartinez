import { useEffect, useState } from "react";
import "./Admin.css";
import Sidebar from "../../shared/sidebar/Sidebar";
import axios from "axios";
import { SweetAlerts } from "../../../core/SweetAlertServices";

function Admin() {
  const [platos, setPlatos] = useState([]);
  const [plato, setPlato] = useState({
    id: "",
    name: "",
    price: "",
    description: ""
  });

  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    getDishes()
  }, [])

  const getDishes = async () => {
    const dbDisehs = await axios.get("http://localhost:4000/restaurant/getDishes");
    console.log(dbDisehs);
    setPlatos(dbDisehs.data.payload)

  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlato((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos del plato:", plato);
    console.log(editIndex);

    if (editIndex !== null) {
      const actualizarPlato = await axios.post('http://localhost:4000/restaurant/updateDish', plato);
      console.log(actualizarPlato);
      if (actualizarPlato.data.status === 200) {
        SweetAlerts.successAlert(actualizarPlato.data.message)
        setPlatos(actualizarPlato.data.payload);
        setEditIndex(null);
        setPlato(null);
      }
    } 
    else {
      console.log('else');
      for (let key in plato) {
        if(key == 'id') continue;
        if (plato[key] === null || plato[key].trim() === "") {
            SweetAlerts.errorAlert("Verifica los datos del formulario.");
            return;
        }
      }
      const crearPlato = await axios.post('http://localhost:4000/restaurant/newdish', plato);
      console.log(crearPlato.data);
      if (crearPlato.data.status === 200) {
        SweetAlerts.successAlert(crearPlato.data.message)
        setPlatos(crearPlato.data.payload)
      }
    }
    setPlato({
      id: "",
      name: "",
      price: "",
      description: ""
    });
  };

  const handleEdit = (index) => {
    setPlato(platos[index]);
    setEditIndex(index);
  };

  const handleDelete = async (_id) => {
    const eliminarPlato = await axios.get(`http://localhost:4000/restaurant/deleteDish/${_id}`);
    if (eliminarPlato.data.status === 200) {
      SweetAlerts.successAlert(eliminarPlato.data.message);
      setPlatos(eliminarPlato.data.payload);
    } else {
      SweetAlerts.successAlert('Error al eliminar plato.');
    }
  };

  return (
    <>
      <div className="contenedor-platos">
        <Sidebar></Sidebar>
        <div className="container">
          <h2>Crear Nuevo Plato de Comida</h2>
          <form onSubmit={handleSubmit} className="form-platos">
            <div className="platos-group">
              <label htmlFor="nombre">Nombre:</label>
              <input type="text" id="name" name="name" value={plato.name} onChange={handleChange} required />
            </div>
            <div className="platos-group">
              <label htmlFor="precio">Precio:</label>
              <input type="number" id="price" name="price" value={plato.price} onChange={handleChange} min="0" step="0.01" required />
            </div>
            <div className="platos-group">
              <label htmlFor="descripcion">Descripción:</label>
              <textarea id="descripcion" name="description" value={plato.description} onChange={handleChange} rows="4" required />
            </div>
            <button type="submit" className="btn-crear-plato">
              Guardar
            </button>
          </form>

          {Object.keys(platos).length > 0 ? (
            <>
              <table className="table-platos">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Descripción</th>
                    <th>Editar</th>
                  </tr>
                </thead>
                <tbody>
                  {platos.map((plato, index) => (
                    <tr key={index}>
                      <td>{index}</td>
                      <td>{plato.name}</td>
                      <td>{plato.price}</td>
                      <td>{plato.description}</td>
                      <td>
                        <a className="btn-opciones">
                          <i onClick={() => handleEdit(index)} className="editar fas fa-edit fa-lg"></i>
                          <i onClick={() => handleDelete(plato._id)} className="eliminar fas fa-trash-alt fa-sm"></i>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

export default Admin;
