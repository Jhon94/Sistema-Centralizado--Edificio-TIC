import { useState } from 'react';
import Header from '../components/Header';
import Modal from '../components/Modal';

const EMPTY_FORM = { tipo: 'PUERTA', estado: 'ACTIVO', ubicacion: '' };

export default function Dispositivos({ dispositivos, setDispositivos, camaras, puertas, usuario }) {
  const [filtroTipo, setFiltroTipo] = useState('TODOS');
  const [modal, setModal] = useState(null);
  const [seleccionado, setSeleccionado] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const esAdmin = usuario?.rol === 'administrador';

  const dispositivosEnriquecidos = dispositivos.map((d) => {
    const camara = camaras.find((c) => c.id_dispositivo === d.id);
    const puerta = puertas.find((p) => p.id_dispositivo === d.id);
    return {
      ...d,
      detalle: camara
        ? `Resolucion: ${camara.resolucion} | ${camara.estado}`
        : puerta
        ? `Estado puerta: ${puerta.estado}`
        : 'Sensor activo',
    };
  });

  const filtrados = filtroTipo === 'TODOS'
    ? dispositivosEnriquecidos
    : dispositivosEnriquecidos.filter((d) => d.tipo === filtroTipo);

  const abrirCrear = () => {
    setForm(EMPTY_FORM);
    setModal('crear');
  };

  const abrirEditar = (d) => {
    setSeleccionado(d);
    setForm({ tipo: d.tipo, estado: d.estado, ubicacion: d.ubicacion });
    setModal('editar');
  };

  const abrirEliminar = (d) => {
    setSeleccionado(d);
    setModal('eliminar');
  };

  const cerrar = () => {
    setModal(null);
    setSeleccionado(null);
    setForm(EMPTY_FORM);
  };

  const guardar = () => {
    if (!form.ubicacion.trim()) return;
    if (modal === 'crear') {
      const nuevoId = dispositivos.length > 0 ? Math.max(...dispositivos.map((d) => d.id)) + 1 : 1;
      setDispositivos([...dispositivos, { id: nuevoId, ...form }]);
    } else {
      setDispositivos(dispositivos.map((d) =>
        d.id === seleccionado.id ? { ...d, ...form } : d
      ));
    }
    cerrar();
  };

  const confirmarEliminar = () => {
    setDispositivos(dispositivos.filter((d) => d.id !== seleccionado.id));
    cerrar();
  };

  return (
    <div className="page">
      <Header titulo="Dispositivos IoT" />

      <div className="page-actions">
        <div className="filter-group">
          <label>Filtrar por tipo:</label>
          <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
            <option value="TODOS">Todos</option>
            <option value="PUERTA">Puertas</option>
            <option value="CAMARA">Camaras</option>
            <option value="SENSOR">Sensores</option>
          </select>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {esAdmin && (
            <button className="btn-add" onClick={abrirCrear}>+ Nuevo Dispositivo</button>
          )}
          <span className="result-count">{filtrados.length} dispositivos</span>
        </div>
      </div>

      <div className="cards-grid">
        {filtrados.map((d) => (
          <div key={d.id} className={`device-card ${d.estado === 'INACTIVO' ? 'device-inactive' : ''}`}>
            <div className="device-card-header">
              <span className={`device-type-icon ${d.tipo.toLowerCase()}`}>
                {d.tipo === 'CAMARA' ? 'CAM' : d.tipo === 'PUERTA' ? 'PTA' : 'SNS'}
              </span>
              <span className={`badge ${d.estado === 'ACTIVO' ? 'badge-success' : 'badge-danger'}`}>
                {d.estado}
              </span>
            </div>
            <div className="device-card-body">
              <h4>{d.tipo} #{d.id}</h4>
              <p className="device-ubicacion">{d.ubicacion}</p>
              <p className="device-detalle">{d.detalle}</p>
            </div>
            {esAdmin && (
              <div className="empresa-card-footer">
                <button className="btn-edit" onClick={() => abrirEditar(d)}>Editar</button>
                <button className="btn-danger" onClick={() => abrirEliminar(d)}>Eliminar</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {(modal === 'crear' || modal === 'editar') && (
        <Modal titulo={modal === 'crear' ? 'Nuevo Dispositivo' : 'Editar Dispositivo'} onClose={cerrar}>
          <div className="form-group">
            <label>Tipo</label>
            <select value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })}>
              <option value="PUERTA">Puerta</option>
              <option value="CAMARA">Camara</option>
              <option value="SENSOR">Sensor</option>
            </select>
          </div>
          <div className="form-group">
            <label>Estado</label>
            <select value={form.estado} onChange={(e) => setForm({ ...form, estado: e.target.value })}>
              <option value="ACTIVO">Activo</option>
              <option value="INACTIVO">Inactivo</option>
            </select>
          </div>
          <div className="form-group">
            <label>Ubicacion</label>
            <input
              value={form.ubicacion}
              onChange={(e) => setForm({ ...form, ubicacion: e.target.value })}
              placeholder="Ej: Piso 3 - Pasillo"
            />
          </div>
          <div className="modal-actions">
            <button className="btn-secondary" onClick={cerrar}>Cancelar</button>
            <button className="btn-success" onClick={guardar}>{modal === 'crear' ? 'Crear' : 'Guardar'}</button>
          </div>
        </Modal>
      )}

      {modal === 'eliminar' && (
        <Modal titulo="Confirmar Eliminacion" onClose={cerrar}>
          <p style={{ fontSize: 14, color: '#475569' }}>
            ¿Eliminar el dispositivo <strong>{seleccionado?.tipo} #{seleccionado?.id}</strong> en{' '}
            <strong>{seleccionado?.ubicacion}</strong>? Esta accion no se puede deshacer.
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
