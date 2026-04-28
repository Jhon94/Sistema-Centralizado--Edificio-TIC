import Header from '../components/Header';
import { usuarios, empleados, guardias, administradores } from '../data/usuarios';
import { empresas } from '../data/empresas';

export default function Empleados() {
  const todosUsuarios = usuarios.map((u) => {
    const emp = empleados.find((e) => e.id_usuario === u.id_usuario);
    const guard = guardias.find((g) => g.id_usuario === u.id_usuario);
    const admin = administradores.find((a) => a.id_usuario === u.id_usuario);
    const empresa = emp ? empresas.find((e) => e.id_empresa === emp.id_empresa) : null;

    return {
      ...u,
      cargo: emp?.cargo || (guard ? `Guardia - ${guard.turno}` : (admin ? `Administrador - ${admin.nivel_acceso}` : '')),
      empresa: empresa?.nombre || 'Edificio TIC',
      estado: emp ? 'ACTIVO' : (guard?.estado || admin?.estado || 'ACTIVO'),
    };
  });

  return (
    <div className="page">
      <Header titulo="Gestion de Usuarios" />

      <div className="section-card">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Cargo / Detalle</th>
              <th>Empresa</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {todosUsuarios.map((u) => (
              <tr key={u.id_usuario}>
                <td>{u.id_usuario}</td>
                <td><strong>{u.nombre}</strong></td>
                <td>{u.correo}</td>
                <td>
                  <span className={`badge ${
                    u.rol === 'administrador' ? 'badge-info' :
                    u.rol === 'guardia' ? 'badge-warning' :
                    'badge-success'
                  }`}>
                    {u.rol.toUpperCase()}
                  </span>
                </td>
                <td>{u.cargo}</td>
                <td>{u.empresa}</td>
                <td>
                  <span className="badge badge-success">{u.estado}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
