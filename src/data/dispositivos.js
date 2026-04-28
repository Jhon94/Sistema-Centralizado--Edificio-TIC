export const dispositivos = [
  { id: 1, tipo: "PUERTA", estado: "ACTIVO", ubicacion: "Entrada Principal" },
  { id: 2, tipo: "PUERTA", estado: "ACTIVO", ubicacion: "Piso 3 - TechCorp" },
  { id: 3, tipo: "PUERTA", estado: "ACTIVO", ubicacion: "Piso 4 - InnovaSoft" },
  { id: 4, tipo: "PUERTA", estado: "INACTIVO", ubicacion: "Piso 5 - DataPlus" },
  { id: 5, tipo: "CAMARA", estado: "ACTIVO", ubicacion: "Lobby Principal" },
  { id: 6, tipo: "CAMARA", estado: "ACTIVO", ubicacion: "Estacionamiento" },
  { id: 7, tipo: "CAMARA", estado: "ACTIVO", ubicacion: "Piso 3 - Pasillo" },
  { id: 8, tipo: "CAMARA", estado: "INACTIVO", ubicacion: "Piso 5 - Pasillo" },
  { id: 9, tipo: "SENSOR", estado: "ACTIVO", ubicacion: "Lobby - Movimiento" },
  { id: 10, tipo: "SENSOR", estado: "ACTIVO", ubicacion: "Piso 3 - Luz" },
  { id: 11, tipo: "SENSOR", estado: "ACTIVO", ubicacion: "Piso 4 - Movimiento" },
  { id: 12, tipo: "SENSOR", estado: "ACTIVO", ubicacion: "Estacionamiento - Luz" },
];

export const camaras = [
  { id_camara: 1, id_dispositivo: 5, resolucion: "4K", estado: "GRABANDO" },
  { id_camara: 2, id_dispositivo: 6, resolucion: "1080p", estado: "GRABANDO" },
  { id_camara: 3, id_dispositivo: 7, resolucion: "1080p", estado: "GRABANDO" },
  { id_camara: 4, id_dispositivo: 8, resolucion: "720p", estado: "DETENIDA" },
];

export const puertas = [
  { id_puerta: 1, id_dispositivo: 1, estado: "CERRADA" },
  { id_puerta: 2, id_dispositivo: 2, estado: "CERRADA" },
  { id_puerta: 3, id_dispositivo: 3, estado: "ABIERTA" },
  { id_puerta: 4, id_dispositivo: 4, estado: "CERRADA" },
];
