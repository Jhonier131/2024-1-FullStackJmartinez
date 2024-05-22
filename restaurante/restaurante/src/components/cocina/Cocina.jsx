import { useState, useEffect } from "react";
import "./Cocina.css";
import Sidebar from "../shared/sidebar/Sidebar";
import axios from "axios";

function CocinaModule() {
  const [allSales, setAllSales] = useState([]);

  useEffect(() => {
    getSales();
  }, []);

  const getSales = async () => {
    const dataSales = await axios.get("http://localhost:4000/restaurant/getSales");
    console.log("dataSales");
    console.log(dataSales.data);
    setAllSales(dataSales.data.payload.sales);
  };

  const handlePedidoRealizado = async (id) => {
    const pedidoRealizado = await axios.get(`http://localhost:4000/restaurant/orderPlaced/${id}`);
    console.log('pedidoRealizado');
    console.log(pedidoRealizado);
    setAllSales(pedidoRealizado.data.payload.sales)

  };

  return (
    <>
      <Sidebar></Sidebar>
      <div>
        <h2 className="cocina-title">Lista de Pedidos</h2>
        <table className="pedido-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Mesa</th>
              <th>Nombre</th>
              <th>Cantidad</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {allSales.map((pedido) => (
              <tr key={pedido.id}>
                <td>{pedido.id}</td>
                <td>{pedido.usuario}</td>
                <td>{pedido.mesa}</td>
                <td>
                  {pedido.items.map((item, index) => (
                    <div key={index}>{item.plato.name}</div>
                  ))}
                </td>
                <td>
                  {pedido.items.map((item, index) => (
                    <div key={index}>{item.cantidad}</div>
                  ))}
                </td>
                <td>{pedido.total}</td>
                <td>{pedido.estado}</td>
                <td>
                  {pedido.estado == 'P' ? (<>
                    <button className="pedido-button" onClick={() => handlePedidoRealizado(pedido.id)}>Realizado</button>
                  </>): (<></>)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default CocinaModule;
