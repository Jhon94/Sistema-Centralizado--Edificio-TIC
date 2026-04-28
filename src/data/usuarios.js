export const usuarios = [
  { id_usuario: 1, nombre: "Jhon Edison Bedoya Olarte", correo: "jhon.bedoya@edificio.com", contrasena: "admin123", rol: "administrador" },
  { id_usuario: 2, nombre: "Ronald Cortes Delgado", correo: "ronald.cortes@edificio.com", contrasena: "guard123", rol: "guardia" },
  { id_usuario: 3, nombre: "William Andres Dussan Gonzalez", correo: "william.dussan@techcorp.com", contrasena: "emp123", rol: "empleado" },
  { id_usuario: 4, nombre: "Juan Andres Leguizamon Suaza", correo: "juan.leguizamon@innovasoft.com", contrasena: "emp123", rol: "empleado" },
  { id_usuario: 5, nombre: "Ronald Cortes", correo: "ronald.cortes2@edificio.com", contrasena: "guard123", rol: "guardia" },
  { id_usuario: 6, nombre: "William Dussan", correo: "william.dussan@dataplus.com", contrasena: "emp123", rol: "empleado" },
  { id_usuario: 7, nombre: "Juan Leguizamon", correo: "juan.leguizamon@techcorp.com", contrasena: "emp123", rol: "empleado" },
  { id_usuario: 8, nombre: "Jhon Bedoya", correo: "jhon.bedoya2@edificio.com", contrasena: "admin123", rol: "administrador" },
];

export const administradores = [
  { id_admin: 1, id_usuario: 1, nivel_acceso: "TOTAL", estado: "ACTIVO" },
  { id_admin: 2, id_usuario: 8, nivel_acceso: "PARCIAL", estado: "ACTIVO" },
];

export const guardias = [
  { id_guardia: 1, id_usuario: 2, turno: "DIURNO", estado: "ACTIVO" },
  { id_guardia: 2, id_usuario: 5, turno: "NOCTURNO", estado: "ACTIVO" },
];

export const empleados = [
  { id_empleado: 1, id_usuario: 3, id_empresa: 1, cargo: "Desarrollador Senior" },
  { id_empleado: 2, id_usuario: 4, id_empresa: 2, cargo: "Analista de Datos" },
  { id_empleado: 3, id_usuario: 6, id_empresa: 3, cargo: "Gerente de Proyectos" },
  { id_empleado: 4, id_usuario: 7, id_empresa: 1, cargo: "Desarrollador Junior" },
];
