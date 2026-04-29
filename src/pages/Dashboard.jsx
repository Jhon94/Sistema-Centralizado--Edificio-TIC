import Header from '../components/Header';
import { dispositivos } from '../data/dispositivos';
import { empresas } from '../data/empresas';
import { empleados } from '../data/usuarios';
import { registrosAcceso } from '../data/accesos';

export default function Dashboard({ loginHistory = [] }) {
  const activos = dispositivos.filter((d) => d.estado === 'ACTIVO').length;
  const inactivos = dispositivos.filter((d) => d.estado === 'INACTIVO').length;
  const accesosHoy = registrosAcceso.filter((r) => r.fecha_hora.startsWith('2026-04-25')).length;
  const accesosFallidos = registrosAcceso.filter((r) => r.resultado === 'FALLIDO').length;

  const stats = [
    { label: 'Empresas Registradas', valor: empresas.length, color: '#3b82f6' },
    { label: 'Empleados Activos', valor: empleados.length, color: '#10b981' },
    { label: 'Dispositivos Activos', valor: activos, color: '#8b5cf6' },
    { label: 'Dispositivos Inactivos', valor: inactivos, color: '#ef4444' },
    { label: 'Accesos Hoy', valor: accesosHoy, color: '#f59e0b' },
    { label: 'Accesos Fallidos', valor: accesosFallidos, color: '#ef4444' },
    { label: 'Inicios de Sesion', valor: loginHistory.length, color: '#06b6d4' },
  ];

  const ultimosAccesos = registrosAcceso
    .slice(-5)
    .reverse();

  return (
    <div className="page">
      <Header titulo="Dashboard" />

      <div className="stats-grid">
        {stats.map((stat, i) => (
          <div key={i} className="stat-card" style={{ borderTopColor: stat.color }}>
            <span className="stat-valor" style={{ color: stat.color }}>{stat.valor}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>

      {loginHistory.length > 0 && (
        <>
          <div className="section-card" style={{ marginBottom: 20 }}>
            <h3>Logueos por Usuario</h3>
            <div className="stats-grid">
              {Object.values(
                loginHistory.reduce((acc, log) => {
                  if (!acc[log.id_usuario]) {
                    acc[log.id_usuario] = { nombre: log.nombre, rol: log.rol, count: 0 };
                  }
                  acc[log.id_usuario].count++;
                  return acc;
                }, {})
              ).map((user, i) => (
                <div key={i} className="stat-card" style={{ borderTopColor: '#06b6d4' }}>
                  <span className="stat-valor" style={{ color: '#06b6d4' }}>{user.count}</span>
                  <span className="stat-label">{user.nombre}</span>
                  <span className="badge badge-info" style={{ marginTop: 4 }}>{user.rol.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="section-card" style={{ marginBottom: 20 }}>
            <h3>Historial de Inicios de Sesion</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Usuario</th>
                  <th>Rol</th>
                  <th>Fecha/Hora</th>
                </tr>
              </thead>
              <tbody>
                {loginHistory.map((log, i) => (
                  <tr key={i}>
                    <td>{loginHistory.length - i}</td>
                    <td>{log.nombre}</td>
                    <td>
                      <span className="badge badge-info">{log.rol.toUpperCase()}</span>
                    </td>
                    <td>{log.fecha_hora}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <div className="dashboard-sections">
        <div className="section-card">
          <h3>Ultimos Accesos</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Fecha/Hora</th>
                <th>Usuario ID</th>
                <th>Dispositivo ID</th>
                <th>Resultado</th>
              </tr>
            </thead>
            <tbody>
              {ultimosAccesos.map((reg) => (
                <tr key={reg.id_registro}>
                  <td>{reg.fecha_hora}</td>
                  <td>{reg.id_usuario}</td>
                  <td>{reg.id_dispositivo}</td>
                  <td>
                    <span className={`badge ${reg.resultado === 'EXITOSO' ? 'badge-success' : 'badge-danger'}`}>
                      {reg.resultado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="section-card">
          <h3>Estado de Dispositivos</h3>
          <div className="device-summary">
            {['PUERTA', 'CAMARA', 'SENSOR'].map((tipo) => {
              const total = dispositivos.filter((d) => d.tipo === tipo).length;
              const act = dispositivos.filter((d) => d.tipo === tipo && d.estado === 'ACTIVO').length;
              return (
                <div key={tipo} className="device-row">
                  <span className="device-tipo">{tipo}S</span>
                  <div className="device-bar-container">
                    <div
                      className="device-bar"
                      style={{ width: `${(act / total) * 100}%` }}
                    />
                  </div>
                  <span className="device-count">{act}/{total}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
