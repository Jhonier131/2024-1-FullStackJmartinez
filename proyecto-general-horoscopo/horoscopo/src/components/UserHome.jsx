import { Navigate, useNavigate } from "react-router-dom";
import './styles/UserHome.css';
import TextSigno from "./TextSigno.jsx";
import { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2'

function UserHome({user}){
    const [tipo, setTipo] = useState('')
    const [textoSigno, setTextoSigno] = useState('');
    const home = useNavigate();
    
    if(user!=="user" || !user){
        return <Navigate to="/"/>
    }

    function goHome(){
        home("/");
    }

    let signo;
    async function handleSelect(event){
        signo = event.target.value;
        if(signo!=="0") {
            const data = {
                signo,
                tipo
            }

            const obtenerSigno = await axios.post('http://localhost:4000/v1/signos/consultarSignos', data);

            if(obtenerSigno.data.status === 200) {
                setTextoSigno(obtenerSigno.data.payload)
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Error al consultar signo!',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                })
            }
            console.log(obtenerSigno.data);
        }
    }


    return (
        <div className="container">
            <div id="txtSeleccionPage"><h3>Selecciona tu signo zodiacal</h3></div>
            <select className="select_tipo" onChange={(e) => setTipo(e.target.value)}>
                <option value="0">Seleccione su tipo</option>
                <option value="Hombre">Hombre</option>
                <option value="Mujer">Mujer</option>
                <option value="Nine">Niñe</option>
            </select>
            <select id="selectSignos" onChange={handleSelect}>
                <option value="0">Seleciona un signo zodiacal</option>
                <option value="Aries">Aries</option>
                <option value="Geminis">Géminis</option>
                <option value="Cancer">Cáncer</option>
                <option value="Leo">Leo</option>
                <option value="Virgo">Virgo</option>
                <option value="Libra">Libra</option>
                <option value="Escorpio">Escorpio</option>
                <option value="Sagitario">Sagitario</option>
                <option value="Capricornio">Capricornio</option>
                <option value="Acuario">Acuario</option>
                <option value="Piscis">Piscis</option>
            </select>
            <TextSigno texto={textoSigno}/>
            <button id="btnHome" onClick={goHome}>Home</button>
        </div>
    )
}

export default UserHome;