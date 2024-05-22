import { useState, useEffect } from "react";
import "./Ventas.css";
import Sidebar from "../shared/sidebar/Sidebar";
import axios from "axios";

function VentasModule() {
  const [sales, setSales] = useState([]);
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    getSales();
  }, []);

  const getSales = async () => {
    const dataSales = await axios.get("http://localhost:4000/restaurant/getCompleteSales");
    setSales(dataSales.data.payload);
    const total = dataSales.data.payload.reduce((acc, sale) => acc + sale.total, 0);
    setTotalSales(total);
  };

  console.log("sales");
  console.log(sales);

  return (
    <>
      <Sidebar></Sidebar>
      <div className="sales-container">
        <h2 className="sales-title">Ventas</h2>
        <table className="sales-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Mesa</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id}>
                <td>{sale.id}</td>
                <td>{sale.usuario}</td>
                <td>{sale.mesa}</td>
                <td>{sale.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="total-sales">
          <strong>Total de ventas:</strong> ${totalSales}
        </div>
      </div>
    </>
  );
}

export default VentasModule;
