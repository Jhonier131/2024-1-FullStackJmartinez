import { useNavigate } from "react-router-dom";
import './styles/AdminHome.css'
import { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2'

function AdminHome({user}){
    const [tipo, setTipo] = useState('')
    const home = useNavigate();
    const [textoEditar, setTextoEditar] = useState("");
    const [signoEditar, setSignoEditar] = useState("");

    function handleSelect(event){
        const signo = event.target.value;
        if(signo!=="0"){
            setSignoEditar(signo);
        } 
    }

    function goHome(){
        home("/");
    }

    async function handleClick(e){
        console.log('DATOS EDITAR');
        console.log(signoEditar, tipo);
        console.log(textoEditar);

        const dataSigno = {
            signoEditar,
            tipo,
            textoEditar
        }
        e.preventDefault();
        const editarSigno = await axios.post('http://localhost:4000/v1/signos/signoEditar', dataSigno)
        console.log(editarSigno.data);
        if(editarSigno.data.status === 200) {
            Swal.fire({
                text: 'Se ha editado el signo correctamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              })
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Ha ocurrido un error al editar el signo.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
        }
    }

    return (
        <div className="container">
            <h2 id="textoAdmin">Edita un Signo Zodiacal</h2>
            <select className="select_tipo" onChange={(e) => setTipo(e.target.value)}>
                <option value="0">Seleccione su tipo</option>
                <option value="Hombre">Hombre</option>
                <option value="Mujer">Mujer</option>
                <option value="Nine">Niñe</option>
            </select>
            <select id="editSignos" onChange={handleSelect}>
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
            <textarea id="textoEditar" cols="50" rows="10" onChange={(e)=> setTextoEditar(e.target.value)}>
            </textarea>
            <button id="btnEditar" onClick={handleClick}>Editar</button>
            <button id="btnHomeAdmin" onClick={goHome}>Home</button>
        </div>
    )
}

export default AdminHome;