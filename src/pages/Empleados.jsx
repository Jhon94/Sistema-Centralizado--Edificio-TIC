import { useState } from 'react';
import Header from '../components/Header';
import Modal from '../components/Modal';

const EMPTY_FORM = {
  nombre: '', correo: '', contrasena: '', rol: 'empleado',
  cargo: '', id_empresa: '', turno: 'DIURNO',
};

export default function Empleados({ usuarios, setUsuarios, empleados, setEmpleados, guardias, admins, empresas, usuario }) {
  const [modal, setModal] = useState(null);
  const [seleccionado, setSeleccionado] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const esAdmin = usuario?.rol === 'administrador';

  const todosUsuarios = usuarios.map((u) => {
    const emp = empleados.find((e) => e.id_usuario === u.id_usuario);
    const guard = guardias.find((g) => g.id_usuario === u.id_usuario);
    const admin = admins.find((a) => a.id_usuario === u.id_usuario);
    const empresa = emp ? empresas.find((e) => e.id_empresa === emp.id_empresa) : null;
    return {
      ...u,
      cargo: emp?.cargo || (guard ? `Guardia - ${guard.turno}` : (admin ? `Administrador - ${admin.nivel_acceso}` : '')),
      empresa: empresa?.nombre || 'Edificio TIC',
      estado: emp ? 'ACTIVO' : (guard?.estado || admin?.estado || 'ACTIVO'),
    };
  });

  const abrirCrear = () => {
    setForm(EMPTY_FORM);
    setModal('crear');
  };

  const abrirEditar = (u) => {
    setSeleccionado(u);
    const emp = empleados.find((e) => e.id_usuario === u.id_usuario);
    const guard = guardias.find((g) => g.id_usuario === u.id_usuario);
    setForm({
      nombre: u.nombre,
      correo: u.correo,
      contrasena: u.contrasena,
      rol: u.rol,
      cargo: emp?.cargo || '',
      id_empresa: emp?.id_empresa || '',
      turno: guard?.turno || 'DIURNO',
    });
    setModal('editar');
  };

  const abrirEliminar = (u) => {
    setSeleccionado(u);
    setModal('eliminar');
  };

  const cerrar = () => {
    setModal(null);
    setSeleccionado(null);
    setForm(EMPTY_FORM);
  };

  const guardar = () => {
    if (!form.nombre.trim() || !form.correo.trim() || !form.contrasena.trim()) return;

    if (modal === 'crear') {
      const nuevoId = usuarios.length > 0 ? Math.max(...usuarios.map((u) => u.id_usuario)) + 1 : 1;
      setUsuarios([...usuarios, {
        id_usuario: nuevoId,
        nombre: form.nombre,
        correo: form.correo,
        contrasena: form.contrasena,
        rol: form.rol,
      }]);
      if (form.rol === 'empleado' && form.cargo && form.id_empresa) {
        const nuevoEmpId = empleados.length > 0 ? Math.max(...empleados.map((e) => e.id_empleado)) + 1 : 1;
        setEmpleados([...empleados, {
          id_empleado: nuevoEmpId,
          id_usuario: nuevoId,
          id_empresa: Number(form.id_empresa),
          cargo: form.cargo,
        }]);
      }
    } else {
      setUsuarios(usuarios.map((u) =>
        u.id_usuario === seleccionado.id_usuario
          ? { ...u, nombre: form.nombre, correo: form.correo, contrasena: form.contrasena, rol: form.rol }
          : u
      ));
      if (form.rol === 'empleado') {
        const existeEmp = empleados.find((e) => e.id_usuario === seleccionado.id_usuario);
        if (existeEmp) {
          setEmpleados(empleados.map((e) =>
            e.id_usuario === seleccionado.id_usuario
              ? { ...e, cargo: form.cargo, id_empresa: Number(form.id_empresa) }
              : e
          ));
        } else {
          const nuevoEmpId = empleados.length > 0 ? Math.max(...empleados.map((e) => e.id_empleado)) + 1 : 1;
          setEmpleados([...empleados, {
            id_empleado: nuevoEmpId,
            id_usuario: seleccionado.id_usuario,
            id_empresa: Number(form.id_empresa),
            cargo: form.cargo,
          }]);
        }
      }
    }
    cerrar();
  };

  const confirmarEliminar = () => {
    setUsuarios(usuarios.filter((u) => u.id_usuario !== seleccionado.id_usuario));
    setEmpleados(empleados.filter((e) => e.id_usuario !== seleccionado.id_usuario));
    cerrar();
  };

  return (
    <div className="page">
      <Header titulo="Gestion de Usuarios" />

      <div className="page-actions">
        {esAdmin && (
          <button className="btn-add" onClick={abrirCrear}>+ Nuevo Usuario</button>
        )}
        <span className="result-count">{usuarios.length} usuarios</span>
      </div>

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
              {esAdmin && <th>Acciones</th>}
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
                    u.rol === 'guardia' ? 'badge-warning' : 'badge-success'
                  }`}>
                    {u.rol.toUpperCase()}
                  </span>
                </td>
                <td>{u.cargo}</td>
                <td>{u.empresa}</td>
                <td><span className="badge badge-success">{u.estado}</span></td>
                {esAdmin && (
                  <td>
                    <div className="table-actions">
                      <button className="btn-edit" onClick={() => abrirEditar(u)}>Editar</button>
                      <button className="btn-danger" onClick={() => abrirEliminar(u)}>Eliminar</button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {(modal === 'crear' || modal === 'editar') && (
        <Modal titulo={modal === 'crear' ? 'Nuevo Usuario' : 'Editar Usuario'} onClose={cerrar}>
          <div className="form-group">
            <label>Nombre completo</label>
            <input value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} placeholder="Nombre apellido" />
          </div>
          <div className="form-group">
            <label>Correo electronico</label>
            <input type="email" value={form.correo} onChange={(e) => setForm({ ...form, correo: e.target.value })} placeholder="correo@ejemplo.com" />
          </div>
          <div className="form-group">
            <label>Contrasena</label>
            <input type="password" value={form.contrasena} onChange={(e) => setForm({ ...form, contrasena: e.target.value })} placeholder="********" />
          </div>
          <div className="form-group">
            <label>Rol</label>
            <select value={form.rol} onChange={(e) => setForm({ ...form, rol: e.target.value })}>
              <option value="empleado">Empleado</option>
              <option value="guardia">Guardia</option>
              <option value="administrador">Administrador</option>
            </select>
          </div>
          {form.rol === 'empleado' && (
            <>
              <div className="form-group">
                <label>Empresa</label>
                <select value={form.id_empresa} onChange={(e) => setForm({ ...form, id_empresa: e.target.value })}>
                  <option value="">Seleccionar empresa</option>
                  {empresas.map((e) => (
                    <option key={e.id_empresa} value={e.id_empresa}>{e.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Cargo</label>
                <input value={form.cargo} onChange={(e) => setForm({ ...form, cargo: e.target.value })} placeholder="Ej: Desarrollador Senior" />
              </div>
            </>
          )}
          {form.rol === 'guardia' && (
            <div className="form-group">
              <label>Turno</label>
              <select value={form.turno} onChange={(e) => setForm({ ...form, turno: e.target.value })}>
                <option value="DIURNO">Diurno</option>
                <option value="NOCTURNO">Nocturno</option>
              </select>
            </div>
          )}
          <div className="modal-actions">
            <button className="btn-secondary" onClick={cerrar}>Cancelar</button>
            <button className="btn-success" onClick={guardar}>{modal === 'crear' ? 'Crear' : 'Guardar'}</button>
          </div>
        </Modal>
      )}

      {modal === 'eliminar' && (
        <Modal titulo="Confirmar Eliminacion" onClose={cerrar}>
          <p style={{ fontSize: 14, color: '#475569' }}>
            ¿Eliminar al usuario <strong>{seleccionado?.nombre}</strong>?
            Esta accion no se puede deshacer.
          </p>
          <div className="modal-actions">
            <button className="btn-secondary" onClick={cerrar}>Cancelar</button>
            <button className="btn-danger" style={{ padding: '8px 18px' }} onClick={confirmarEliminar}>Eliminar</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
