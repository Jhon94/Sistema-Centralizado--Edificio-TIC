import { NavLink } from 'react-router-dom';

export default function Sidebar({ usuario, onLogout }) {
  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '⊞' },
    { path: '/accesos', label: 'Registro Accesos', icon: '⊟' },
    { path: '/dispositivos', label: 'Dispositivos IoT', icon: '⊡' },
    { path: '/empresas', label: 'Empresas', icon: '⊞' },
    { path: '/empleados', label: 'Empleados', icon: '⊟' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Edificio TIC</h2>
        <span className="sidebar-subtitle">Sistema Centralizado</span>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            <span className="sidebar-icon">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <span className="user-name">{usuario?.nombre}</span>
          <span className="user-role">{usuario?.rol?.toUpperCase()}</span>
        </div>
        <button className="btn-logout" onClick={onLogout}>
          Cerrar Sesion
        </button>
      </div>
    </aside>
  );
}
