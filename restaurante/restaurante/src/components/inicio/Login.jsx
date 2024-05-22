import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SweetAlerts } from "../../core/SweetAlertServices";
import "./Login.css";
import axios from "axios";
import { useStore } from "../../core/store";

function Login() {
  const goTo = useNavigate();
  const [name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setDataUser} = useStore();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    // goTo('/platos');

    event.preventDefault();
    const data = {
      name,
      password
    }
    console.log('aAAAAAA');
    await axios.post('http://localhost:4000/restaurant/auth', data).then((response) =>{
      console.log(response);
      if (response.data.status === 200) {
        setDataUser(response.data.payload);
        console.log(response.data.payload.username);
        localStorage.setItem('dataUser', response.data.payload.username);
        switch (response.data.payload.rol) {
          case 1:
            goTo('/platos');
            break;
          case 2:
            goTo('/mesero');
            break;
          case 3:
            goTo('/cocina');
            break;
        }
      } else {
        SweetAlerts.errorAlert("Credenciales invalidas.");
      }
    })

  };

  return (
    <>
      <div className="App">
        <div className="login-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" name="username" value={name} onChange={handleUsernameChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} required />
            </div>
            <button className="btn-login" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
      <p className="copyrigh">Jhonier Martinez Yela @ 2024</p>
    </>
  );
}

export default Login;
    