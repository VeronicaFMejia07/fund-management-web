// Modelo de datos para las suscripciones a fondos de inversión
export interface Subscriptions {
  fundID:                 string;
  name:               string;
  min_amount:         number;
  category:           string;
  notificationMethod: string;
  date:               string;
  id:                  number;
}

// Modelo de datos para mostrar en la tabla de suscripciones, sin el campo 'id' que es interno
export interface SubscriptionTable {
  fundID:                 string;
  name:               string;
  min_amount:         number;
  category:           string;
  notificationMethod: string;
}
