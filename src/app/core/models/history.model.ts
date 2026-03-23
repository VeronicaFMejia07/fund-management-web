// Modelo de datos para el historial de acciones realizadas por el usuario
export interface History {
  fundID:             string;
  name:               string;
  min_amount:         number;
  category:           string;
  notificationMethod: string;
  date:               string;
  type:              string;
  id?:                 number;
}

// Modelo de datos para mostrar en la tabla de historial, sin el campo 'id' que es interno
export interface HistoryTable {
  fundID:             string;
  name:               string;
  min_amount:         number;
  category:           string;
  notificationMethod: string;
  date:               string;
  type:              string;
}
