import { useState } from 'react';
import { usuarios } from '../data/usuarios';

export default function Login({ onLogin }) {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const usuario = usuarios.find(
      (u) => u.correo === correo && u.contrasena === contrasena
    );
    if (usuario) {
      onLogin(usuario);
    } else {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Edificio Inteligente TIC</h1>
          <p>Sistema de Gestion Centralizado</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Correo electronico</label>
            <input
              type="email"
              value={correo}
              onChange={(e) => { setCorreo(e.target.value); setError(''); }}
              placeholder="correo@ejemplo.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Contrasena</label>
            <input
              type="password"
              value={contrasena}
              onChange={(e) => { setContrasena(e.target.value); setError(''); }}
              placeholder="********"
              required
            />
          </div>

          {error && <div className="login-error">{error}</div>}

          <button type="submit" className="btn-primary">
            Iniciar Sesion
          </button>
        </form>

        <div className="login-demo">
          <p><strong>Usuarios de prueba:</strong></p>
          <div className="demo-users">
            <div className="demo-user" onClick={() => { setCorreo('jhon.bedoya@edificio.com'); setContrasena('admin123'); }}>
              <span className="demo-role">Admin</span>
              <span>jhon.bedoya@edificio.com — Jhon Edison Bedoya</span>
            </div>
            <div className="demo-user" onClick={() => { setCorreo('ronald.cortes@edificio.com'); setContrasena('guard123'); }}>
              <span className="demo-role">Guardia</span>
              <span>ronald.cortes@edificio.com — Ronald Cortes</span>
            </div>
            <div className="demo-user" onClick={() => { setCorreo('william.dussan@techcorp.com'); setContrasena('emp123'); }}>
              <span className="demo-role">Empleado</span>
              <span>william.dussan@techcorp.com — William Dussan</span>
            </div>
            <div className="demo-user" onClick={() => { setCorreo('juan.leguizamon@innovasoft.com'); setContrasena('emp123'); }}>
              <span className="demo-role">Empleado</span>
              <span>juan.leguizamon@innovasoft.com — Juan Leguizamon</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
