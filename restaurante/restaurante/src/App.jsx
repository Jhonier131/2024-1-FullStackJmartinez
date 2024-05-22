import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'; 
import Login from './components/inicio/Login';
import Admin from './components/admin/platos/Admin';
import CrearUsuario from './components/admin/crear-usuario/CrearUsuario';
import MeseroModule from './components/mesero/Mesero';
import CocinaModule from './components/cocina/cocina';
import VentasModule from './components/ventas/Ventas';

function App() {
  return (
    <>
    <div className='contenedor-componentes'>
      <BrowserRouter>
        <Routes>
          {/* <Route index element={<CrearUsuario/>}></Route> */}
          <Route index element={<Login/>}></Route>
          <Route path='/platos' element={<Admin/>}></Route>
          <Route path='/crear-usuario' element={<CrearUsuario/>}></Route>
          <Route path='/mesero' element={<MeseroModule/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/cocina' element={<CocinaModule/>}></Route>
          <Route path='/ventas' element={<VentasModule/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
    </>
  )
}

export default App;
