import './styles/Form.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2'

function Form({callback}){
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const goTo = useNavigate();

    const validateUser = async (event)=>{
        event.preventDefault();

        const usuario =  {
            user: username,
            password: password,
        };

        const validarUsuario = await axios.post('http://localhost:4000/v1/signos/login', usuario);
        console.log('validarUsuario');
        console.log(validarUsuario.data);
        const { payload } = validarUsuario.data

        if(validarUsuario.data.status === 200){
            callback("user");
            if(payload.admin) {
                if(payload.user.user === 'admin' && payload.user.password === '112233') goTo("/adminHome");
            } else {
                if(payload.user.user === 'jhonier' && payload.user.password === '112233') goTo("/userHome");
            }
        } else {
            Swal.fire({
                title: 'Error!',
                text: validarUsuario.data.payload.mensaje,
                icon: 'error',
                confirmButtonText: 'Aceptar'
              })
        }
        // else if(username === 'admin' && password==='112233'){
        //     callback("admin");
        //     goTo("/adminHome");
        // }
    }

    return (
        <form onSubmit={validateUser}>
            <div className='credenciales'>
                <h3>Usuarios</h3>
                <div className='usuarios'>
                    <div>
                        <p>jhonier</p>
                        <p>112233</p>
                    </div>
                    <div>
                        <p>admin</p>
                        <p>112233</p>
                    </div>
                </div>
            </div>
            <h1 id="txtBienvenida">Bienvenido a nuestro portal del Zodiaco</h1>
            <div className='card_shadow'>
                <h4 className="txt">Nombre de Usuario</h4>  
                <input type="text" className="entry" onChange={(e)=> setUsername(e.target.value)}/><br></br>
                <h4 className="txt">Contraseña</h4>  
                <input type="password" className="entry" onChange={(e)=> setPassword(e.target.value)}/><br></br>
                <input type="submit" value="Ingresar" id="btnEnviar"/>
            </div>
        </form>
    )
}

export default Form;