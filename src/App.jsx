import { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Accesos from './pages/Accesos';
import Dispositivos from './pages/Dispositivos';
import Empresas from './pages/Empresas';
import Empleados from './pages/Empleados';

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [loginHistory, setLoginHistory] = useState([]);
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
          <Route path="/dashboard" element={<Dashboard loginHistory={loginHistory} />} />
          <Route path="/accesos" element={<Accesos />} />
          <Route path="/dispositivos" element={<Dispositivos />} />
          <Route path="/empresas" element={<Empresas />} />
          <Route path="/empleados" element={<Empleados />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </main>
    </div>
  );
}
