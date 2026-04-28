import Header from '../components/Header';
import { empresas } from '../data/empresas';
import { empleados } from '../data/usuarios';

export default function Empresas() {
  const empresasConEmpleados = empresas.map((emp) => ({
    ...emp,
    numEmpleados: empleados.filter((e) => e.id_empresa === emp.id_empresa).length,
  }));

  return (
    <div className="page">
      <Header titulo="Empresas Registradas" />

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
          </div>
        ))}
      </div>
    </div>
  );
}
