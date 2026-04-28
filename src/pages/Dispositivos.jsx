import { useState } from 'react';
import Header from '../components/Header';
import { dispositivos, camaras, puertas } from '../data/dispositivos';

export default function Dispositivos() {
  const [filtroTipo, setFiltroTipo] = useState('TODOS');

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
        <span className="result-count">{filtrados.length} dispositivos</span>
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
          </div>
        ))}
      </div>
    </div>
  );
}
