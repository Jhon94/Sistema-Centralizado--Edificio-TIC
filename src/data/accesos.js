export const accesos = [
  { id_acceso: 1, tipo_acceso: "ENTRADA", estado: "PERMITIDO", descripcion: "Entrada autorizada al edificio" },
  { id_acceso: 2, tipo_acceso: "SALIDA", estado: "PERMITIDO", descripcion: "Salida autorizada del edificio" },
  { id_acceso: 3, tipo_acceso: "ENTRADA", estado: "DENEGADO", descripcion: "Intento de entrada no autorizado" },
  { id_acceso: 4, tipo_acceso: "ENTRADA", estado: "PERMITIDO", descripcion: "Entrada a piso restringido" },
];

export const registrosAcceso = [
  { id_registro: 1, id_usuario: 3, id_acceso: 1, id_dispositivo: 1, fecha_hora: "2026-04-25 08:15:00", resultado: "EXITOSO" },
  { id_registro: 2, id_usuario: 4, id_acceso: 1, id_dispositivo: 1, fecha_hora: "2026-04-25 08:30:00", resultado: "EXITOSO" },
  { id_registro: 3, id_usuario: 7, id_acceso: 1, id_dispositivo: 1, fecha_hora: "2026-04-25 08:45:00", resultado: "EXITOSO" },
  { id_registro: 4, id_usuario: 6, id_acceso: 3, id_dispositivo: 2, fecha_hora: "2026-04-25 09:00:00", resultado: "FALLIDO" },
  { id_registro: 5, id_usuario: 3, id_acceso: 4, id_dispositivo: 2, fecha_hora: "2026-04-25 09:10:00", resultado: "EXITOSO" },
  { id_registro: 6, id_usuario: 4, id_acceso: 4, id_dispositivo: 3, fecha_hora: "2026-04-25 09:15:00", resultado: "EXITOSO" },
  { id_registro: 7, id_usuario: 3, id_acceso: 2, id_dispositivo: 1, fecha_hora: "2026-04-25 12:30:00", resultado: "EXITOSO" },
  { id_registro: 8, id_usuario: 7, id_acceso: 2, id_dispositivo: 1, fecha_hora: "2026-04-25 13:00:00", resultado: "EXITOSO" },
  { id_registro: 9, id_usuario: 3, id_acceso: 1, id_dispositivo: 1, fecha_hora: "2026-04-25 14:00:00", resultado: "EXITOSO" },
  { id_registro: 10, id_usuario: 6, id_acceso: 1, id_dispositivo: 1, fecha_hora: "2026-04-25 14:30:00", resultado: "EXITOSO" },
  { id_registro: 11, id_usuario: 4, id_acceso: 2, id_dispositivo: 3, fecha_hora: "2026-04-25 17:00:00", resultado: "EXITOSO" },
  { id_registro: 12, id_usuario: 6, id_acceso: 2, id_dispositivo: 1, fecha_hora: "2026-04-25 17:30:00", resultado: "EXITOSO" },
  { id_registro: 13, id_usuario: 3, id_acceso: 2, id_dispositivo: 1, fecha_hora: "2026-04-25 18:00:00", resultado: "EXITOSO" },
  { id_registro: 14, id_usuario: 7, id_acceso: 1, id_dispositivo: 1, fecha_hora: "2026-04-26 07:50:00", resultado: "EXITOSO" },
  { id_registro: 15, id_usuario: 3, id_acceso: 1, id_dispositivo: 1, fecha_hora: "2026-04-26 08:00:00", resultado: "EXITOSO" },
];
