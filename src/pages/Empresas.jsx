import { useState } from 'react';
import Header from '../components/Header';
import Modal from '../components/Modal';

const EMPTY_FORM = { nombre: '', direccion: '', telefono: '' };

export default function Empresas({ empresas, setEmpresas, empleados, usuario }) {
  const [modal, setModal] = useState(null); // null | 'crear' | 'editar' | 'eliminar'
  const [seleccionada, setSeleccionada] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const esAdmin = usuario?.rol === 'administrador';

  const empresasConEmpleados = empresas.map((emp) => ({
    ...emp,
    numEmpleados: empleados.filter((e) => e.id_empresa === emp.id_empresa).length,
  }));

  const abrirCrear = () => {
    setForm(EMPTY_FORM);
    setModal('crear');
  };

  const abrirEditar = (empresa) => {
    setSeleccionada(empresa);
    setForm({ nombre: empresa.nombre, direccion: empresa.direccion, telefono: empresa.telefono });
    setModal('editar');
  };

  const abrirEliminar = (empresa) => {
    setSeleccionada(empresa);
    setModal('eliminar');
  };

  const cerrar = () => {
    setModal(null);
    setSeleccionada(null);
    setForm(EMPTY_FORM);
  };

  const guardar = () => {
    if (!form.nombre.trim() || !form.direccion.trim() || !form.telefono.trim()) return;
    if (modal === 'crear') {
      const nuevoId = empresas.length > 0 ? Math.max(...empresas.map((e) => e.id_empresa)) + 1 : 1;
      setEmpresas([...empresas, {
        id_empresa: nuevoId,
        ...form,
        fecha_registro: new Date().toISOString().slice(0, 10),
      }]);
    } else {
      setEmpresas(empresas.map((e) =>
        e.id_empresa === seleccionada.id_empresa ? { ...e, ...form } : e
      ));
    }
    cerrar();
  };

  const confirmarEliminar = () => {
    setEmpresas(empresas.filter((e) => e.id_empresa !== seleccionada.id_empresa));
    cerrar();
  };

  return (
    <div className="page">
      <Header titulo="Empresas Registradas" />

      {esAdmin && (
        <div className="page-actions">
          <button className="btn-add" onClick={abrirCrear}>+ Nueva Empresa</button>
          <span className="result-count">{empresas.length} empresas</span>
        </div>
      )}

      <div className="cards-grid">
        {empresasConEmpleados.map((empresa) => (
          <div key={empresa.id_empresa} className="empresa-card">
            <div className="empresa-card-header">
              <h3>{empresa.nombre}</h3>
              <span className="badge badge-info">ID: {empresa.id_empresa}</span>
            </div>
            <div className="empresa-card-body">
              <div className="empresa-info">
                <span className="info-label">Ubicacion:</span>
                <span>{empresa.direccion}</span>
              </div>
              <div className="empresa-info">
                <span className="info-label">Telefono:</span>
                <span>{empresa.telefono}</span>
              </div>
              <div className="empresa-info">
                <span className="info-label">Fecha Registro:</span>
                <span>{empresa.fecha_registro}</span>
              </div>
              <div className="empresa-info">
                <span className="info-label">Empleados:</span>
                <span className="empresa-empleados">{empresa.numEmpleados}</span>
              </div>
            </div>
            {esAdmin && (
              <div className="empresa-card-footer">
                <button className="btn-edit" onClick={() => abrirEditar(empresa)}>Editar</button>
                <button className="btn-danger" onClick={() => abrirEliminar(empresa)}>Eliminar</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {(modal === 'crear' || modal === 'editar') && (
        <Modal titulo={modal === 'crear' ? 'Nueva Empresa' : 'Editar Empresa'} onClose={cerrar}>
          <div className="form-group">
            <label>Nombre</label>
            <input
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              placeholder="Nombre de la empresa"
            />
          </div>
          <div className="form-group">
            <label>Direccion / Ubicacion</label>
            <input
              value={form.direccion}
              onChange={(e) => setForm({ ...form, direccion: e.target.value })}
              placeholder="Piso X, Oficina XXX"
            />
          </div>
          <div className="form-group">
            <label>Telefono</label>
            <input
              value={form.telefono}
              onChange={(e) => setForm({ ...form, telefono: e.target.value })}
              placeholder="601-555-0000"
            />
          </div>
          <div className="modal-actions">
            <button className="btn-secondary" onClick={cerrar}>Cancelar</button>
            <button className="btn-success" onClick={guardar}>
              {modal === 'crear' ? 'Crear' : 'Guardar'}
            </button>
          </div>
        </Modal>
      )}

      {modal === 'eliminar' && (
        <Modal titulo="Confirmar Eliminacion" onClose={cerrar}>
          <p style={{ fontSize: 14, color: '#475569' }}>
            ¿Eliminar la empresa <strong>{seleccionada?.nombre}</strong>?
            Esta accion no se puede deshacer.
          </p>
          <div className="modal-actions">
            <button className="btn-secondary" onClick={cerrar}>Cancelar</button>
            <button className="btn-danger" style={{ padding: '8px 18px' }} onClick={confirmarEliminar}>
              Eliminar
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
