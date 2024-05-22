const {add, subtract, multiply} = require('../operaciones/operaciones.js');

function sumar(req, res){
    console.log(req);
    const body = req;
    const {number1, number2} = body;
    const result = add(number1, number2);
    return result;
}

function restar(req, res){
    const body = req;
    const {number1, number2} = body;
    const result = subtract(number1, number2);
    return result;
}

function multiplicar(req, res){
    const body = req;
    const {number1, number2} = body;
    const result = multiply(number1, number2);
    return result;
}

function operaciones(req, res) {
    const {body} = req;
    const {operacion, number1, number2} = body;
    console.log(body);
    let result;

    switch (operacion) {
        case 'sumar':
            result = sumar({number1, number2})
            break;
        case 'restar':
            result = restar({number1, number2})
            break;
        case 'multiplicar':
            result = multiplicar({number1, number2})
            break;
    }

    res.json({
        resultado: result
    })
}

module.exports = {
    sumar,
    restar,
    multiplicar,
    operaciones
}