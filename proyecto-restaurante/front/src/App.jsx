import { useState } from 'react'
import './App.css'
import Form from './componentes/login/Form';
import {BrowserRouter, Routes, Route} from 'react-router-dom'; 
import MeseroHome from './componentes/mesero/meseroHome';


function App() {
  const [user, setUser] = useState(null);
  return (  
    <BrowserRouter>
      {/* <Navigation/> */}
      <Routes>
        <Route index element={<Form callback={setUser}/>}></Route>
        <Route path='/meseroHome' element={<MeseroHome user={user}/>}></Route>
        {/* <Route path='/adminHome' element={<AdminHome user={user}/>}></Route> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
