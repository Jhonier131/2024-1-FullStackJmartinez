const express = require('express');
const {urlencoded, json} = require('express');
const cors = require('cors');
const db = require('./database/mongo.js');
const app = express();
const routerPaises = require('./routes/paises.routes.js');

db.dbInit().then(res => {
    console.log('Conexion realizada');
})

app.use(urlencoded({extended: true}))
app.use(json())

app.use(cors())
app.use('/paises', routerPaises);

app.listen(4000, ()=>{
    console.log('listening at port 4000');
})