import { useState, useEffect } from "react";
import "./Mesero.css";
import Sidebar from "../shared/sidebar/Sidebar";
import axios from "axios";
import { SweetAlerts } from "../../core/SweetAlertServices";

function MeseroModule() {
  const [mesaSeleccionada, setMesaSeleccionada] = useState("");
  const [platos, setplatos] = useState([]);
  const [pedido, setPedido] = useState([]);
  const [totalPedido, setTotalPedido] = useState(0);

  useEffect(() => {
    getProducts();

    let total = 0;

    pedido.forEach(item => {
      total += item.plato.price * item.cantidad;
    });
    setTotalPedido(total);

  }, [pedido]);


  const getProducts = async () => {
    const getPlatos = await axios.get('http://localhost:4000/restaurant/getDishes');
    setplatos(getPlatos.data.payload)
  } 


  const agregarPlato = (plato) => {
    const pedidoActualizado = [...pedido];

    console.log('pedidoActualizado');
    console.log(pedidoActualizado);

    console.log(plato);
    const itemExistente = pedidoActualizado.find(item => item.plato.name === plato.name);

    if (itemExistente) {
      itemExistente.cantidad += 1;
    } else {
      pedidoActualizado.push({ plato, cantidad: 1 });
    }

    setPedido(pedidoActualizado);
  };

  const eliminarPlato = (plato) => {
    console.log('plato');
    console.log(plato);
    console.log(pedido);
    const pedidoActualizado = pedido.map(item => {
      if (item.plato._id == plato._id) item.cantidad--;
      return item;
    });
    setPedido(pedidoActualizado);
  };

  const enviarPedido = async () => {

    console.log(localStorage.getItem('dataUser'));
    const enviarPedido = {
      id:null,
      usuario: localStorage.getItem('dataUser'),
      total: totalPedido,
      mesa: mesaSeleccionada,
      estado: 'P',
      items: pedido.map(item => item)
    };

    console.log('enviarPedido');
    console.log(enviarPedido);

    const guardarPedido = await axios.post('http://localhost:4000/restaurant/addSale', enviarPedido);
    console.log(guardarPedido.data);
    if (guardarPedido.data.status === 200) {
      SweetAlerts.successAlert(guardarPedido.data.message)
    }

    setPedido([]);
  };

  const handleMesa = (event) => {
    const valorSeleccionado = event.target.value;
    setMesaSeleccionada(valorSeleccionado); 
  };

  return (
    <>
      <Sidebar></Sidebar>
      <div className="mesero-module">
        <div className="platos-lista">
          {platos.map((plato) => (
            <div className="plato-card" key={plato.id}>
              <h3>{plato.name}</h3>
              <p>Precio: ${plato.price}</p>
              <p>{plato.description}</p>
              <button onClick={() => agregarPlato(plato)}>Agregar al Pedido</button>
            </div>
          ))}
        </div>
        <div className="pedido-lista">
          <h2>Pedido del Cliente</h2>
          {pedido.length > 0 ? (
            <>
              <label htmlFor="mesa">Mesa:</label>
              <select id="mesa" name="mesa" onChange={handleMesa} value={mesaSeleccionada} className="select-mesa">
                <option value="">Seleccionar mesa</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
              <ul className="pedido">
                {pedido.map((item, index) => (
                  <li key={index}>
                    {item.plato.name} - ${item.plato.price} x {item.cantidad}
                    <a onClick={() => eliminarPlato(item.plato)}>
                      <i className="icon-menos fas fa-minus-circle"></i>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="total-pedido">Total del Pedido: ${totalPedido}</p>
              <button onClick={enviarPedido}>Enviar Pedido</button>
            </>
          ) : (
            <div className="contenedor-sin-platos">
              <i className="icon-food fas fa-utensils fa-5x"></i>
              <p>No hay platos seleccionados.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MeseroModule;
