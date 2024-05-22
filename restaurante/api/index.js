const express = require('express');
const {urlencoded, json} = require('express');
const router = require('./routes/signos.routes.js');
const routerRestaurant = require('./routes/restaurant.routes.js');
const cors = require('cors');
const db = require('./database/mongo.js');

const app = express();

db.dbInit().then(res => {
    console.log('Conexion realizada');
})

app.use(urlencoded({extended: true}))
app.use(json())

app.use(cors())
app.use('/v1/signos', router);
app.use('/restaurant', routerRestaurant);

app.listen(4000, ()=>{
    console.log('listening at port 4000');
})