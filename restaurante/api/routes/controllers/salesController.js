const fs = require('fs/promises');
const path = require('path');
const { response } = require("../helpers/dataResponse");
const dbSales = fs.readFile(path.join(__dirname,'../../db/sales.json'));

const addSales = async (req, res) => {
    try {
        const sales = await dbSales;
        const salesJson = await JSON.parse(sales);
        let dataSale = req.body;

        let maxId = 0;
        for (const sale of salesJson.sales) {
            console.log(sale.id);
            if (sale.id > maxId) {
                maxId = sale.id;
            }
        }
        maxId += 1;

        dataSale.id = maxId;
        salesJson.sales.push(dataSale)
        await fs.writeFile(path.join(__dirname,'../../db/sales.json'), JSON.stringify(salesJson, null, 2), {encoding: 'utf-8'})

        response(res, {payload: salesJson, msg: "Se hizo el pedido correctamente."});

    } catch (error) {
        console.log("Error -> ", error.message);
        return res.status(500).json(error.message);
    }
}

const getSales = async (req, res) => {
    const sales = await dbSales;
    const salesJson = await JSON.parse(sales);
    console.log('salesJson');
    response(res, {payload: salesJson, msg: "."});
}

const orderPlaced = async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        console.log(id);

        const sales = await dbSales;
        const salesJson = await JSON.parse(sales);

        const venta = salesJson.sales.find(sale => sale.id === id);
        if (venta) {
            venta.estado = "V";
        }
        await fs.writeFile(path.join(__dirname,'../../db/sales.json'), JSON.stringify(salesJson, null, 2), {encoding: 'utf-8'})
        response(res, {payload: salesJson});
        
    } catch (error) {
        console.log("Error -> ", error.message);cdcd
        return res.status(500).json(error.message);
    }
}

const getCompleteSales = async(req, res) => {
    try {
        
        const sales = await dbSales;
        const salesJson = await JSON.parse(sales);

        // Filtrar las ventas que están en estado "V"
        const ventasCompletas = salesJson.sales.filter(venta => venta.estado === "V");

        console.log('ventasCompletas');
        console.log(ventasCompletas);

        // Devolver las ventas completas al frontend
        response(res, { payload: ventasCompletas });
    } catch (error) {
        
    }
}



module.exports = {
    addSales,
    getSales,
    orderPlaced,
    getCompleteSales
}
