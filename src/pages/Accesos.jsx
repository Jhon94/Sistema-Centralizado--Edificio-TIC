import { useState } from 'react';
import Header from '../components/Header';
import { registrosAcceso, accesos } from '../data/accesos';
import { usuarios } from '../data/usuarios';
import { dispositivos } from '../data/dispositivos';

export default function Accesos() {
  const [filtroResultado, setFiltroResultado] = useState('TODOS');

  const registrosEnriquecidos = registrosAcceso.map((reg) => {
    const usuario = usuarios.find((u) => u.id_usuario === reg.id_usuario);
    const acceso = accesos.find((a) => a.id_acceso === reg.id_acceso);
    const dispositivo = dispositivos.find((d) => d.id === reg.id_dispositivo);
    return { ...reg, usuario, acceso, dispositivo };
  });

  const registrosFiltrados = filtroResultado === 'TODOS'
    ? registrosEnriquecidos
    : registrosEnriquecidos.filter((r) => r.resultado === filtroResultado);

  return (
    <div className="page">
      <Header titulo="Registro de Accesos" />

      <div className="page-actions">
        <div className="filter-group">
          <label>Filtrar por resultado:</label>
          <select value={filtroResultado} onChange={(e) => setFiltroResultado(e.target.value)}>
            <option value="TODOS">Todos</option>
            <option value="EXITOSO">Exitoso</option>
            <option value="FALLIDO">Fallido</option>
          </select>
        </div>
        <span className="result-count">{registrosFiltrados.length} registros</span>
      </div>

      <div className="section-card">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha / Hora</th>
              <th>Usuario</th>
              <th>Tipo Acceso</th>
              <th>Dispositivo</th>
              <th>Ubicacion</th>
              <th>Resultado</th>
            </tr>
          </thead>
          <tbody>
            {registrosFiltrados.map((reg) => (
              <tr key={reg.id_registro}>
                <td>{reg.id_registro}</td>
                <td>{reg.fecha_hora}</td>
                <td>{reg.usuario?.nombre || 'N/A'}</td>
                <td>
                  <span className={`badge ${reg.acceso?.tipo_acceso === 'ENTRADA' ? 'badge-info' : 'badge-warning'}`}>
                    {reg.acceso?.tipo_acceso}
                  </span>
                </td>
                <td>{reg.dispositivo?.tipo}</td>
                <td>{reg.dispositivo?.ubicacion}</td>
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
    </div>
  );
}
