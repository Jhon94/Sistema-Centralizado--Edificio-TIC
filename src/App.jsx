import { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Accesos from './pages/Accesos';
import Dispositivos from './pages/Dispositivos';
import Empresas from './pages/Empresas';
import Empleados from './pages/Empleados';
import { empresas as empresasInit } from './data/empresas';
import { usuarios as usuariosInit, empleados as empleadosInit, guardias as guardiasInit, administradores as adminsInit } from './data/usuarios';
import { dispositivos as dispositivosInit, camaras as camarasInit, puertas as puertasInit } from './data/dispositivos';
import { registrosAcceso as registrosInit, accesos as accesosInit } from './data/accesos';

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [loginHistory, setLoginHistory] = useState([]);
  const [empresas, setEmpresas] = useState([...empresasInit]);
  const [usuariosData, setUsuariosData] = useState([...usuariosInit]);
  const [empleadosData, setEmpleadosData] = useState([...empleadosInit]);
  const [guardiasData] = useState([...guardiasInit]);
  const [adminsData] = useState([...adminsInit]);
  const [dispositivosData, setDispositivosData] = useState([...dispositivosInit]);
  const [camarasData] = useState([...camarasInit]);
  const [puertasData] = useState([...puertasInit]);
  const [registrosData, setRegistrosData] = useState([...registrosInit]);
  const [accesosData] = useState([...accesosInit]);
  const navigate = useNavigate();

  const handleLogin = (user) => {
    setUsuario(user);
    setLoginHistory((prev) => [
      { id_usuario: user.id_usuario, nombre: user.nombre, rol: user.rol, fecha_hora: new Date().toLocaleString() },
      ...prev,
    ]);
    navigate('/dashboard');
  };

  const handleLogout = () => {
    setUsuario(null);
    navigate('/');
  };

  if (!usuario) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-layout">
      <Sidebar usuario={usuario} onLogout={handleLogout} />
      <main className="main-content">
        <Routes>
          <Route path="/dashboard" element={
            <Dashboard loginHistory={loginHistory} empresas={empresas} empleados={empleadosData}
              dispositivos={dispositivosData} registros={registrosData} />
          } />
          <Route path="/accesos" element={
            <Accesos registros={registrosData} setRegistros={setRegistrosData} accesos={accesosData}
              usuarios={usuariosData} dispositivos={dispositivosData} usuario={usuario} />
          } />
          <Route path="/dispositivos" element={
            <Dispositivos dispositivos={dispositivosData} setDispositivos={setDispositivosData}
              camaras={camarasData} puertas={puertasData} usuario={usuario} />
          } />
          <Route path="/empresas" element={
            <Empresas empresas={empresas} setEmpresas={setEmpresas} empleados={empleadosData} usuario={usuario} />
          } />
          <Route path="/empleados" element={
            <Empleados usuarios={usuariosData} setUsuarios={setUsuariosData}
              empleados={empleadosData} setEmpleados={setEmpleadosData}
              guardias={guardiasData} admins={adminsData} empresas={empresas} usuario={usuario} />
          } />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </main>
    </div>
  );
}
