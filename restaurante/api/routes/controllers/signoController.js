const fs = require('fs/promises');
const path = require('path');



const validarUsuario = async (req, res)=>{
    console.log('LOGIN');
    console.log(req.body);
    const { user, password } = req.body

    if(user === 'jhonier' && password === '112233') {
        res.json({status: 200, payload: {admin: false, user: req.body}});
    }else if(user === 'admin' && password === '112233') {
        res.json({status: 200, payload: {admin: true, user: req.body}});
    }else {
        res.json({status: 500, payload: { mensaje: 'Error al consultar usuario.' }});
    }
}

const getAllSignos = async (req, res)=>{
    const signo = await fs.readFile(path.join(__dirname,'../../db/signos.json'));
    const signosJson = JSON.parse(signo)
    res.json(signosJson);
}

const getOneSigno = async (req, res)=>{
    const { signo, tipo } = req.body;
    const signoDb = await fs.readFile(path.join(__dirname,'../../db/signos.json'));
    const signosJson = JSON.parse(signoDb)
    const resSigno = signosJson[tipo][signo];
    res.json({status: 200, payload: resSigno});
}

const updateSigno = async (req, res)=>{

    const { signoEditar, textoEditar, tipo } = req.body;
    
    console.log('EDITAR SIGNOS');
    console.log(tipo);
    console.log(signoEditar);
    console.log(textoEditar);

    const allSignos = await fs.readFile(path.join(__dirname,'../../db/signos.json'));
    const objSignos = JSON.parse(allSignos);

    const objUpdate = {
        ...objSignos,
        [tipo]:{
            ...objSignos[tipo],
            [signoEditar]: textoEditar
        }
    }
    await fs.writeFile(path.join(__dirname,'../../db/signos.json'), JSON.stringify(objUpdate, null, 2), {encoding: 'utf-8'})

    console.log(objUpdate);
    res.json({status:200, payload: "Actualizado" })
}

module.exports = {
    validarUsuario,
    getAllSignos,
    getOneSigno,
    updateSigno
}