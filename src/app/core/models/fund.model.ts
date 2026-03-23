// Modelo de datos para un fondo de inversión
export interface Fund {
  fundID:         string;
  name:       string;
  min_amount: number;
  category:   string;
  notificationMethod: string;
  date: string;
}
