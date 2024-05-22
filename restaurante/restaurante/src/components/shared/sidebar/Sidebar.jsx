import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import { useStore } from '../../../core/store';

function Sidebar() {
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const { dataUser, setDataUser } = useStore();
    

    // useEffect( ()=> {
    //     console.log(JSON.parse(localStorage.getItem('dataUser')));
        // setDataUser(JSON.parse(localStorage.getItem('dataUser')));
    // }
    // ,[variables que escucha]
    // );
    // console.log(dataUser);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };


    return (
        <>
        { dataUser ? <>
            <div className={`sidebar ${sidebarVisible ? 'sidebar' : 'collapsed'}`}>
                <p className="toggle-btn" onClick={toggleSidebar}>
                    <i className="fas fa-bars fa-lg"></i>
                </p>
                {dataUser.rol === 1 ? <>
                <NavLink to="/crear-usuario" activeClassName="active"><i className="icon-sidebar fas fa-user-edit"></i>Crear usuario</NavLink>
                <NavLink to="/platos" activeClassName="active"><i className="icon-sidebar fas fa-hamburger"></i>Platos</NavLink>
                <NavLink to="/ventas" activeClassName="active"><i className="icon-sidebar fas fa-coins"></i>Ventas</NavLink>
                </> : <></>}
    
                {dataUser.rol === 2 ? <>
                <NavLink to="/mesero" activeClassName="active"><i className="icon-sidebar fas fa-clipboard-list"></i>Mesero</NavLink>
                </> : <></>}
    
                {dataUser.rol === 3 ? <>
                <NavLink to="/cocina"><i className="icon-sidebar fas fa-utensils"></i>Cocina</NavLink>
                </> : <></> }
                <NavLink to="/login" className="cerrar-sesion"><i className="icon-sidebar fas fa-sign-out-alt"></i>Cerrar sesion</NavLink>
            </div>
            </>: <></>}
        </>
    );
}

export default Sidebar;